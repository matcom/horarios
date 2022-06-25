import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Semester } from '../../domain/entities/semester.entity';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { SemesterRepository } from '../../infra/repositories/semester.repository';
import Optional from '../../../shared/core/Option';

export type FindByIdSemesterUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Semester>
    | AppError.ValidationErrorResult<Semester>
    | AppError.ObjectNotExistResult<Semester>,
    Result<Semester>>;

@Injectable()
export class FindByIdSemesterUseCase implements IUseCase<{ id: string }, Promise<FindByIdSemesterUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly semesterRepository: SemesterRepository) {
    this._logger = new Logger('FindByIdSemesterUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdSemesterUseCaseResponse> {
    try {
      return Optional(await this.semesterRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`Semester with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (semester: Semester) =>
            right(Result.Ok(semester)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
