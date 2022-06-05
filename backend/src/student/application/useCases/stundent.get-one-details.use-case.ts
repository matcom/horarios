import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Student } from '../../../student/domain/entities/student.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { StudentRepository } from '../../../student/infra/repositories/student.repository';
import Optional from '../../../shared/core/Option';

export type FindDetailsStudentUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Student>
    | AppError.ValidationErrorResult<Student>
    | AppError.ObjectNotExistResult<Student>,
    Result<Student>>;

@Injectable()
export class FindDetailsStudentUseCase implements IUseCase<{ id: string }, Promise<FindDetailsStudentUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly studentRepository: StudentRepository) {
    this._logger = new Logger('FindDetailsStudentUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindDetailsStudentUseCaseResponse> {
    try {
      return Optional(await this.studentRepository.findDetails(request.id))
        .okOr(new AppError.ObjectNotExist(`Student with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (student: Student) =>
            right(Result.Ok(student)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
