import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Student } from '../../../student/domain/entities/student.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { StudentUpdateDto } from '../../../student/application/dtos/student.update.dto';
import { StudentRepository } from '../../../student/infra/repositories/student.repository';
import Optional from '../../../shared/core/Option';

export type UpdateStudentUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Student>
    | AppError.ValidationErrorResult<Student>
    | AppError.ObjectNotExistResult<Student>,
    Result<Student>>;

@Injectable()
export class UpdateStudentUseCase implements IUseCase<StudentUpdateDto, Promise<UpdateStudentUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly studentRepository: StudentRepository) {
    this._logger = new Logger('UpdateStudentUseCase');
  }

  async execute(request: StudentUpdateDto): Promise<UpdateStudentUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.studentRepository.findById(request.studentId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Student with id ${request.studentId} doesn't exist`)));

    let forUpdate: Student = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.studentRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
