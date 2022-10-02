import { CreateSimpleCountRestrictionUseCase } from './count-restrictions/count-restrictions.create.use-case';
import { GetClassesByConditions } from './get-class-by-conditions.use-case';
import { BuildWhereUseCase } from './build-where.use-case';
import { EvaluateSimpleCountRestrictionUseCase } from './count-restrictions/count-restrictions.evaluate.use-case';
import {
  CreateCountConditionsRestrictionsUseCase,
} from './count-conditions-restrictions/count-conditions.restrictions.create.use-case';
import {
  EvaluateCountConditionsRestrictionsUseCase,
} from './count-conditions-restrictions/count-conditions.restrictions.evaluate.use-case';
import {
  FindAllCountConditionsRestrictionsUseCase,
} from './count-conditions-restrictions/count-conditions.restrictions.find-all.use-case';
import { FindAllSimpleCountRestrictionsUseCase } from './count-restrictions/count-restrictions.find-all.use-case';
import { RemoveSimpleCountRestrictionsUseCase } from './count-restrictions/count.restrictions.remove.use-case';
import {
  RemoveCountConditionsRestrictionsUseCase,
} from './count-conditions-restrictions/count-condition.restrictions.remove.use-case';
import { RestrictionsEvaluationUseCase } from './restrictions.evaluation.use-case';

export * from './get-class-by-conditions.use-case';
export * from './build-where.use-case';

export * from './count-restrictions/count-restrictions.create.use-case';
export * from './count-restrictions/count-restrictions.evaluate.use-case';
export * from './count-restrictions/count-restrictions.find-all.use-case';
export * from './count-restrictions/count.restrictions.remove.use-case';

export * from './count-conditions-restrictions/count-conditions.restrictions.evaluate.use-case';
export * from './count-conditions-restrictions/count-conditions.restrictions.create.use-case';
export * from './count-conditions-restrictions/count-condition.restrictions.remove.use-case';
export * from './count-conditions-restrictions/count-conditions.restrictions.find-all.use-case';

export * from './restrictions.evaluation.use-case';

export const RestrictionsUseCases = [
  BuildWhereUseCase,
  GetClassesByConditions,
  RestrictionsEvaluationUseCase,

  CreateSimpleCountRestrictionUseCase,
  EvaluateSimpleCountRestrictionUseCase,
  FindAllSimpleCountRestrictionsUseCase,
  RemoveSimpleCountRestrictionsUseCase,

  CreateCountConditionsRestrictionsUseCase,
  FindAllCountConditionsRestrictionsUseCase,
  EvaluateCountConditionsRestrictionsUseCase,
  RemoveCountConditionsRestrictionsUseCase,
];