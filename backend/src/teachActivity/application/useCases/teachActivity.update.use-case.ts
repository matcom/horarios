import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { TeachActivity } from '../../../teachActivity/domain/entities/teachActivity.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeachActivityUpdateDto } from '../../../teachActivity/application/dtos/teachActivity.update.dto';
import { TeachActivityRepository } from '../../../teachActivity/infra/repositories/teachActivity.repository';
import Optional from '../../../shared/core/Option';

export type UpdateTeachActivityUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<TeachActivity>
    | AppError.ValidationErrorResult<TeachActivity>
    | AppError.ObjectNotExistResult<TeachActivity>,
    Result<TeachActivity>>;

@Injectable()
export class UpdateTeachActivityUseCase implements IUseCase<TeachActivityUpdateDto, Promise<UpdateTeachActivityUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teachActivityRepository: TeachActivityRepository) {
    this._logger = new Logger('UpdateTeachActivityUseCase');
  }

  async execute(request: TeachActivityUpdateDto): Promise<UpdateTeachActivityUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.teachActivityRepository.findById(request.teachActivityId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`TeachActivity with id ${request.teachActivityId} doesn't exist`)));

    let forUpdate: TeachActivity = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.teachActivityRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
