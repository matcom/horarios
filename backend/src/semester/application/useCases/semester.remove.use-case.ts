import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Semester } from '../../domain/entities/semester.entity';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { SemesterRepository } from '../../infra/repositories/semester.repository';
import Optional from '../../../shared/core/Option';

export type RemoveSemesterUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Semester>
    | AppError.ValidationErrorResult<Semester>
    | AppError.ObjectNotExistResult<Semester>,
    Result<Semester>>;

@Injectable()
export class RemoveSemesterUseCase implements IUseCase<{ id: string }, Promise<RemoveSemesterUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly semesterRepository: SemesterRepository) {
    this._logger = new Logger('RemoveSemesterUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveSemesterUseCaseResponse> {
    const semester = Optional(await this.semesterRepository.findById(request.id));

    if (semester.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Semester with id ${request.id} doesn't exist`)));

    try {
      await this.semesterRepository.drop(semester.unwrap());
      return right(Result.Ok(semester.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
