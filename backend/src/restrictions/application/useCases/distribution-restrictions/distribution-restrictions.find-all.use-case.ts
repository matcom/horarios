import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '../../../../shared/core/Either';
import { FindAllResult } from '../../../../shared/core/FindAllResult';
import { AppError } from '../../../../shared/core/errors/AppError';
import { Result } from '../../../../shared/core/Result';
import { IUseCase } from '../../../../shared/core/interfaces/IUseCase';
import { DistributionRestrictions } from 'src/restrictions/domain/entities/distribution-restriction.entity';
import {
  DistributionRestrictionsFindAllDto,
} from '../../dtos/distribution-restrictions/distribution-restrictions.find-all.dto';
import { DistributionRestrictionsRepository } from '../../../infra/repositories/distribution-restrictions.repository';

export type FindAllDistributionRestrictionsUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<FindAllResult<DistributionRestrictions>>
    | AppError.ValidationErrorResult<FindAllResult<DistributionRestrictions>>
    | AppError.ObjectNotExistResult<FindAllResult<DistributionRestrictions>>,
    Result<FindAllResult<DistributionRestrictions>>>;

@Injectable()
export class FindAllDistributionRestrictionsUseCase implements IUseCase<DistributionRestrictionsFindAllDto, Promise<FindAllDistributionRestrictionsUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly distributionRestrictionsRepository: DistributionRestrictionsRepository) {
    this._logger = new Logger('FindAllDistributionRestrictionsUseCase');
  }

  async execute(request: DistributionRestrictionsFindAllDto): Promise<FindAllDistributionRestrictionsUseCaseResponse> {
    try {
      const ans = await this.distributionRestrictionsRepository.findAll(request.filter);
      return right(Result.Ok(ans));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
