import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { TeachActivity } from '../../../teachActivity/domain/entities/teachActivity.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeachActivityRepository } from '../../../teachActivity/infra/repositories/teachActivity.repository';
import Optional from '../../../shared/core/Option';

export type RemoveTeachActivityUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<TeachActivity>
    | AppError.ValidationErrorResult<TeachActivity>
    | AppError.ObjectNotExistResult<TeachActivity>,
    Result<TeachActivity>>;

@Injectable()
export class RemoveTeachActivityUseCase implements IUseCase<{ id: string }, Promise<RemoveTeachActivityUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teachActivityRepository: TeachActivityRepository) {
    this._logger = new Logger('RemoveTeachActivityUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveTeachActivityUseCaseResponse> {
    const teachActivity = Optional(await this.teachActivityRepository.findById(request.id));

    if (teachActivity.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`TeachActivity with id ${request.id} doesn't exist`)));

    try {
      await this.teachActivityRepository.drop(teachActivity.unwrap());
      return right(Result.Ok(teachActivity.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
