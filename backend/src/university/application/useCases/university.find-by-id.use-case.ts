import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { University } from '../../domain/entities/university.entity';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { UniversityRepository } from '../../infra/repositories/university.repository';
import Optional from '../../../shared/core/Option';

export type FindByIdUniversityUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<University>
    | AppError.ValidationErrorResult<University>
    | AppError.ObjectNotExistResult<University>,
    Result<University>>;

@Injectable()
export class FindByIdUniversityUseCase implements IUseCase<{ id: string }, Promise<FindByIdUniversityUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly universityRepository: UniversityRepository) {
    this._logger = new Logger('FindByIdUniversityUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdUniversityUseCaseResponse> {
    try {
      return Optional(await this.universityRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`University with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (university: University) =>
            right(Result.Ok(university)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
