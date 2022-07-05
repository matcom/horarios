import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Week } from '../../domain/entities/week.entity';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { WeekRepository } from '../../infra/repositories/week.repository';
import Optional from '../../../shared/core/Option';

export type FindByIdWeekUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Week>
    | AppError.ValidationErrorResult<Week>
    | AppError.ObjectNotExistResult<Week>,
    Result<Week>>;

@Injectable()
export class FindByIdWeekUseCase implements IUseCase<{ id: string }, Promise<FindByIdWeekUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly weekRepository: WeekRepository) {
    this._logger = new Logger('FindByIdWeekUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdWeekUseCaseResponse> {
    try {
      return Optional(await this.weekRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`Week with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (week: Week) =>
            right(Result.Ok(week)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
