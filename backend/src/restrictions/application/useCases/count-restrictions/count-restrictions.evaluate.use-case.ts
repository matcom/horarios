import { Either, left, right } from '../../../../shared/core/Either';
import { AppError } from '../../../../shared/core/errors/AppError';
import { Result } from '../../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../../shared/core/interfaces/IUseCase';
import { CountRestrictionsRepository } from '../../../infra/repositories/count-restrictions.repository';
import { CountRestrictions } from '../../../domain/entities/count-restriction.entity';
import { BuildWhereUseCase } from '../build-where.use-case';
import { RestrictionType } from '../../../domain/enums/restriction-type';
import { ClassRepository } from 'src/class/infra/repositories/class.repository';
import { BodyQuery } from '../../utils/utils';
import { EvaluateCountRestrictionsResponseDto } from '../../dtos/count-restrictions/evaluate-restrictions.response.dto';

export type EvaluateCountRestrictionUseCaseResponse = Either<AppError.UnexpectedErrorResult<EvaluateCountRestrictionsResponseDto[]>
  | AppError.ValidationErrorResult<EvaluateCountRestrictionsResponseDto[]>,
  Result<EvaluateCountRestrictionsResponseDto[]>>;


@Injectable()
export class EvaluateCountRestrictionUseCase implements IUseCase<{}, Promise<EvaluateCountRestrictionUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly countRestrictionsRepository: CountRestrictionsRepository,
    private readonly buildWhere: BuildWhereUseCase,
    private readonly classRepository: ClassRepository,
  ) {
    this._logger = new Logger('EvaluateCountRestrictionsUseCase');
  }

  async execute(request: {}): Promise<EvaluateCountRestrictionUseCaseResponse> {
    this._logger.log('Executing...');

    const bodyQuery = BodyQuery;

    const restrictions: CountRestrictions[] = (await this.countRestrictionsRepository
      .findAll({ restrictionType: RestrictionType.CountRestriction }))
      .items;

    try {
      let ans: EvaluateCountRestrictionsResponseDto[] = [];
      for (let i = 0; i < restrictions.length; ++i) {
        const r = restrictions[i];
        const condition = JSON.parse(r.condition);
        const where = this.buildWhere.build(condition);

        const rawQuery = `${bodyQuery} WHERE ${where}`;

        const evaluation = await this.classRepository.executeRawQuery(rawQuery, []);

        ans.push({
          restrictionId: r._id.toString(),
          classes: evaluation,
        });
      }
      return right(Result.Ok());
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}