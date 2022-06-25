import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Week } from '../../domain/entities/week.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { WeekRepository } from '../../infra/repositories/week.repository';
import { FindAllResult } from '../../../shared/core/FindAllResult';
import { WeekFindAllDto } from '../dtos/week.find-all.dto';

export type FindAllWeekUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<FindAllResult<Week>>
    | AppError.ValidationErrorResult<FindAllResult<Week>>
    | AppError.ObjectNotExistResult<FindAllResult<Week>>,
    Result<FindAllResult<Week>>>;

@Injectable()
export class FindAllWeekUseCase implements IUseCase<WeekFindAllDto, Promise<FindAllWeekUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly weekRepository: WeekRepository) {
    this._logger = new Logger('FindAllWeekUseCase');
  }

  async execute(request: WeekFindAllDto): Promise<FindAllWeekUseCaseResponse> {
    try {
      const ans = await this.weekRepository.findAll(request.filter);
      return right(Result.Ok(ans));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
