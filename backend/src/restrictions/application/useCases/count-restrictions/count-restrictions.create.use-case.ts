import { Either, left, right } from '../../../../shared/core/Either';
import { AppError } from '../../../../shared/core/errors/AppError';
import { Result } from '../../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../../shared/core/interfaces/IUseCase';
import { CountRestrictionsDto } from '../../dtos/count-restrictions/count-restrictions.dto';
import { CountRestrictionsRepository } from '../../../infra/repositories/count-restrictions.repository';
import { CountRestrictions } from '../../../domain/entities/count-restriction.entity';
import { CountRestrictionsCreateDto } from '../../dtos/count-restrictions/count-restrictions.create.dto';
import { RestrictionType } from '../../../domain/enums/restriction-type';

export type CreateCountRestrictionUseCaseResponse = Either<AppError.UnexpectedErrorResult<CountRestrictions>
  | AppError.ValidationErrorResult<CountRestrictions>,
  Result<CountRestrictions>>;


@Injectable()
export class CreateCountRestrictionUseCase implements IUseCase<CountRestrictionsDto, Promise<CreateCountRestrictionUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly countRestrictionsRepository: CountRestrictionsRepository,
  ) {
    this._logger = new Logger('CreateCountRestrictionsUseCase');
  }

  async execute(request: CountRestrictionsCreateDto): Promise<CreateCountRestrictionUseCaseResponse> {
    this._logger.log('Executing...');

    const countRestrictionsOrError: Result<CountRestrictions> = CountRestrictions.New({
      ...request,
      restrictionType: RestrictionType.CountRestriction,
    });

    if (countRestrictionsOrError.isFailure)
      return left(countRestrictionsOrError);

    const countRestrictions: CountRestrictions = countRestrictionsOrError.unwrap();

    try {
      await this.countRestrictionsRepository.save(countRestrictions);

      return right(Result.Ok(countRestrictions));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
