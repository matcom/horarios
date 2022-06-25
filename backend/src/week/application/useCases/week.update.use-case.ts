import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Week } from '../../domain/entities/week.entity';
import { Result } from '../../../shared/core/Result';
import { WeekUpdateDto } from '../dtos/week.update.dto';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { WeekRepository } from '../../infra/repositories/week.repository';
import Optional from '../../../shared/core/Option';

export type UpdateWeekUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Week>
    | AppError.ValidationErrorResult<Week>
    | AppError.ObjectNotExistResult<Week>,
    Result<Week>>;

@Injectable()
export class UpdateWeekUseCase implements IUseCase<WeekUpdateDto, Promise<UpdateWeekUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly weekRepository: WeekRepository) {
    this._logger = new Logger('UpdateWeekUseCase');
  }

  async execute(request: WeekUpdateDto): Promise<UpdateWeekUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.weekRepository.findById(request.weekId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Week with id ${request.weekId} doesn't exist`)));

    let forUpdate: Week = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.weekRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}