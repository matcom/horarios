import { Either, left, right } from 'src/shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Week } from '../../domain/entities/week.entity';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { WeekCreateDto } from '../dtos/week.create.dto';
import { WeekRepository } from '../../infra/repositories/week.repository';

export type CreateWeekUseCaseResponse = Either<AppError.UnexpectedErrorResult<Week>
  | AppError.ValidationErrorResult<Week>,
  Result<Week>>;

@Injectable()
export class CreateWeekUseCase implements IUseCase<WeekCreateDto, Promise<CreateWeekUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly weekRepository: WeekRepository) {
    this._logger = new Logger('CreateWeekUseCase');
  }

  async execute(request: WeekCreateDto): Promise<CreateWeekUseCaseResponse> {
    this._logger.log('Executing...');

    const weekDomainOrError: Result<Week> = Week.New({
      ...request,
    });

    if (weekDomainOrError.isFailure)
      return left(weekDomainOrError);

    const week: Week = weekDomainOrError.unwrap();

    try {
      await this.weekRepository.save(week);
      return right(Result.Ok(week));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}