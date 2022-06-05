import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Student } from '../../../student/domain/entities/student.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { StudentRepository } from '../../../student/infra/repositories/student.repository';
import Optional from '../../../shared/core/Option';

export type RemoveStudentUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Student>
    | AppError.ValidationErrorResult<Student>
    | AppError.ObjectNotExistResult<Student>,
    Result<Student>>;

@Injectable()
export class RemoveStudentUseCase implements IUseCase<{ id: string }, Promise<RemoveStudentUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly studentRepository: StudentRepository) {
    this._logger = new Logger('RemoveStudentUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveStudentUseCaseResponse> {
    const student = Optional(await this.studentRepository.findById(request.id));

    if (student.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Student with id ${request.id} doesn't exist`)));

    try {
      await this.studentRepository.drop(student.unwrap());
      return right(Result.Ok(student.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
