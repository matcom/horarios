import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { TeachYear } from '../../../teachYear/domain/entities/teachYear.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeachYearRepository } from '../../../teachYear/infra/repositories/teachYear.repository';
import Optional from '../../../shared/core/Option';

export type FindByIdTeachYearUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<TeachYear>
    | AppError.ValidationErrorResult<TeachYear>
    | AppError.ObjectNotExistResult<TeachYear>,
    Result<TeachYear>>;

@Injectable()
export class FindByIdTeachYearUseCase implements IUseCase<{ id: string }, Promise<FindByIdTeachYearUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teachYearRepository: TeachYearRepository) {
    this._logger = new Logger('FindByIdTeachYearUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdTeachYearUseCaseResponse> {
    try {
      return Optional(await this.teachYearRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`TeachYear with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (teachYear: TeachYear) =>
            right(Result.Ok(teachYear)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
