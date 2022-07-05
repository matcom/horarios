import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Week } from '../../domain/entities/week.entity';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { WeekRepository } from '../../infra/repositories/week.repository';
import Optional from '../../../shared/core/Option';

export type RemoveWeekUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Week>
    | AppError.ValidationErrorResult<Week>
    | AppError.ObjectNotExistResult<Week>,
    Result<Week>>;

@Injectable()
export class RemoveWeekUseCase implements IUseCase<{ id: string }, Promise<RemoveWeekUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly weekRepository: WeekRepository) {
    this._logger = new Logger('RemoveWeekUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveWeekUseCaseResponse> {
    const week = Optional(await this.weekRepository.findById(request.id));

    if (week.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Week with id ${request.id} doesn't exist`)));

    try {
      await this.weekRepository.drop(week.unwrap());
      return right(Result.Ok(week.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
