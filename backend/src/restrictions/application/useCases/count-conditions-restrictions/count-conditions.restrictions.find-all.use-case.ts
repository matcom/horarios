import { FindAllResult } from 'src/shared/core/FindAllResult';
import { Either, left, right } from '../../../../shared/core/Either';
import { AppError } from '../../../../shared/core/errors/AppError';
import { CountConditionsRestrictions } from '../../../domain/entities/count-conditions.restrictions.entity';
import { Result } from '../../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../../shared/core/interfaces/IUseCase';
import {
  CountConditionsRestrictionsFindAllDto
} from '../../dtos/count-conditions-restrictions/count-conditions.restrictions.find-all.dto';
import {
  CountConditionsRestrictionsRepository
} from '../../../infra/repositories/count-conditions.restrictions.repository';

export type FindAllCountConditionsRestrictionsUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<FindAllResult<CountConditionsRestrictions>>
    | AppError.ValidationErrorResult<FindAllResult<CountConditionsRestrictions>>
    | AppError.ObjectNotExistResult<FindAllResult<CountConditionsRestrictions>>,
    Result<FindAllResult<CountConditionsRestrictions>>>;

@Injectable()
export class FindAllCountConditionsRestrictionsUseCase implements IUseCase<CountConditionsRestrictionsFindAllDto, Promise<FindAllCountConditionsRestrictionsUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly countConditionsRestrictionsRepository: CountConditionsRestrictionsRepository) {
    this._logger = new Logger('FindAllCountConditionsRestrictionsUseCase');
  }

  async execute(request: CountConditionsRestrictionsFindAllDto): Promise<FindAllCountConditionsRestrictionsUseCaseResponse> {
    try {
      const ans = await this.countConditionsRestrictionsRepository.findAll(request.filter);
      return right(Result.Ok(ans));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
