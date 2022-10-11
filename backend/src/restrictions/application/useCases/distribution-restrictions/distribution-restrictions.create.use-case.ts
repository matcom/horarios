import { Either, left, right } from '../../../../shared/core/Either';
import { AppError } from '../../../../shared/core/errors/AppError';
import { Result } from '../../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../../shared/core/interfaces/IUseCase';
import { RestrictionType } from '../../../domain/enums/restriction-type';
import { FindByIdUserUseCase } from '../../../../user/application/useCases/user.findById.use-case';
import { DistributionRestrictions } from '../../../domain/entities/distribution-restriction.entity';
import { DistributionRestrictionsDto } from '../../dtos/distribution-restrictions/distribution-restrictions.dto';
import { DistributionRestrictionsRepository } from '../../../infra/repositories/distribution-restrictions.repository';
import {
  DistributionRestrictionsCreateDto,
} from '../../dtos/distribution-restrictions/distribution-restrictions.create.dto';

export type CreateDistributionRestrictionUseCaseResponse = Either<AppError.UnexpectedErrorResult<DistributionRestrictions>
  | AppError.ValidationErrorResult<DistributionRestrictions>,
  Result<DistributionRestrictions>>;


@Injectable()
export class CreateDistributionRestrictionUseCase implements IUseCase<DistributionRestrictionsDto, Promise<CreateDistributionRestrictionUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly countRestrictionsRepository: DistributionRestrictionsRepository,
    private readonly userFindById: FindByIdUserUseCase,
  ) {
    this._logger = new Logger('CreateDistributionRestrictionsUseCase');
  }

  async execute(request: DistributionRestrictionsCreateDto): Promise<CreateDistributionRestrictionUseCaseResponse> {
    this._logger.log('Executing...');

    const user = await this.userFindById.execute({ id: request.teacherId.id });
    request.teacherId = user.value.unwrap().teacherId;

    const countRestrictionsOrError: Result<DistributionRestrictions> = DistributionRestrictions.New({
      ...request,
      conditions: JSON.parse(request.conditions),
      restrictionType: RestrictionType.DistributionRestrictions,
    });

    if (countRestrictionsOrError.isFailure)
      return left(countRestrictionsOrError);

    const countRestrictions: DistributionRestrictions = countRestrictionsOrError.unwrap();

    try {
      await this.countRestrictionsRepository.save(countRestrictions);

      return right(Result.Ok(countRestrictions));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}