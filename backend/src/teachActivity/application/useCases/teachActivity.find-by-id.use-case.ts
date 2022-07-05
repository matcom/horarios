import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { TeachActivity } from '../../../teachActivity/domain/entities/teachActivity.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeachActivityRepository } from '../../../teachActivity/infra/repositories/teachActivity.repository';
import Optional from '../../../shared/core/Option';

export type FindByIdTeachActivityUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<TeachActivity>
    | AppError.ValidationErrorResult<TeachActivity>
    | AppError.ObjectNotExistResult<TeachActivity>,
    Result<TeachActivity>>;

@Injectable()
export class FindByIdTeachActivityUseCase implements IUseCase<{ id: string }, Promise<FindByIdTeachActivityUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teachActivityRepository: TeachActivityRepository) {
    this._logger = new Logger('FindByIdTeachActivityUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdTeachActivityUseCaseResponse> {
    try {
      return Optional(await this.teachActivityRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`TeachActivity with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (teachActivity: TeachActivity) =>
            right(Result.Ok(teachActivity)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
