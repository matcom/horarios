import { Either, left, right } from '../../../../shared/core/Either';
import { AppError } from '../../../../shared/core/errors/AppError';
import { Result } from '../../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../../shared/core/interfaces/IUseCase';
import { RestrictionType } from '../../../domain/enums/restriction-type';
import { CountConditionsRestrictions } from '../../../domain/entities/count-conditions.restrictions.entity';
import {
  CountConditionsRestrictionsDto,
} from '../../dtos/count-conditions-restrictions/count-conditions-restrictions.dto';
import {
  CountConditionsRestrictionsRepository,
} from '../../../infra/repositories/count-conditions.restrictions.repository';
import {
  CountConditionsRestrictionsCreateDto,
} from '../../dtos/count-conditions-restrictions/count-conditions.create.dto';
import { FindByIdUserUseCase } from '../../../../user/application/useCases/user.findById.use-case';

export type CreateCountConditionsRestrictionsUseCaseResponse = Either<AppError.UnexpectedErrorResult<CountConditionsRestrictions>
  | AppError.ValidationErrorResult<CountConditionsRestrictions>,
  Result<CountConditionsRestrictions>>;


@Injectable()
export class CreateCountConditionsRestrictionsUseCase implements IUseCase<CountConditionsRestrictionsDto, Promise<CreateCountConditionsRestrictionsUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly countConditionsRestrictionsRepository: CountConditionsRestrictionsRepository,
    private readonly userFindById: FindByIdUserUseCase,
  ) {
    this._logger = new Logger('CreateCountConditionsRestrictionsUseCase');
  }

  async execute(request: CountConditionsRestrictionsCreateDto): Promise<CreateCountConditionsRestrictionsUseCaseResponse> {
    this._logger.log('Executing...');

    const user = await this.userFindById.execute({ id: request.teacherId.id });

    request.teacherId = user.value.unwrap().teacherId;

    const countConditionsRestrictionsOrError: Result<CountConditionsRestrictions> = CountConditionsRestrictions.New({
      ...request,
      conditions: JSON.parse(request.conditions),
      subConditions: JSON.parse(request.subConditions),
      restrictionType: RestrictionType.CountConditionsRestriction,
    });

    if (countConditionsRestrictionsOrError.isFailure)
      return left(countConditionsRestrictionsOrError);

    const countConditionsRestrictions: CountConditionsRestrictions = countConditionsRestrictionsOrError.unwrap();

    try {
      await this.countConditionsRestrictionsRepository.save(countConditionsRestrictions);

      return right(Result.Ok(countConditionsRestrictions));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
