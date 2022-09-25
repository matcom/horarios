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
import { BodyQuery, Opera } from '../../utils/utils';
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
      for (let t = 0; t < restrictions.length; ++t) {
        const r = restrictions[t];
        const condition = JSON.parse(r.condition);
        const where = this.buildWhere.build(condition);

        const rawQuery = `${bodyQuery} WHERE ${where} ORDER BY "class"."start" ASC`;
        const evaluation = await this.classRepository.executeRawQuery(rawQuery, []);

        let intervals = [];
        for (let i = 0, k = 0; i < evaluation.length; i += r.interval, ++k) {
          intervals.push([]);

          for (let j = 0; j < r.interval; ++j)
            intervals[k].push(evaluation[i + j]);
        }

        let count = 0;
        if (r.min) {
          for (let i = 0; i < intervals.length; ++i)
            count += (Opera(r.min, intervals[i].length, r.operator)) ? 1 : 0;
        } else if (r.part) {
          for (let i = 1; i < intervals.length; ++i)
            count += (Opera(intervals[i].length, r.part * intervals[i - 1].length, r.operator)) ? 1 : 0;
        }
        const final = count / intervals.length;
        console.log(count, intervals.length, final, evaluation.length);

        // TODO: add r.id if restriction isn't passed. i don't know how handle that
        // ans.push({
        //   restrictionId: r._id.toString(),
        // });
      }
      return right(Result.Ok(ans));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}