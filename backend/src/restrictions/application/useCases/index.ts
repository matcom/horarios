import { CreateCountRestrictionUseCase } from './count-restrictions/count-restrictions.create.use-case';
import { GetClassesByConditions } from './get-class-by-conditions.use-case';
import { BuildWhereUseCase } from './build-where.use-case';
import { EvaluateCountRestrictionUseCase } from './count-restrictions/count-restrictions.evaluate.use-case';
import {
  CreateCountConditionsRestrictionsUseCase,
} from './count-conditions-restrictions/count-conditions.restrictions.create.use-case';
import {
  EvaluateCountConditionsRestrictionsUseCase,
} from './count-conditions-restrictions/count-conditions.restrictions.evaluate.use-case';

export * from './count-restrictions/count-restrictions.create.use-case';
export * from './get-class-by-conditions.use-case';
export * from './build-where.use-case';
export * from './count-restrictions/count-restrictions.evaluate.use-case';
export * from './count-conditions-restrictions/count-conditions.restrictions.evaluate.use-case';
export * from './count-conditions-restrictions/count-conditions.restrictions.create.use-case';

export const RestrictionsUseCases = [
  BuildWhereUseCase,
  GetClassesByConditions,

  CreateCountRestrictionUseCase,
  EvaluateCountRestrictionUseCase,

  CreateCountConditionsRestrictionsUseCase,
  EvaluateCountConditionsRestrictionsUseCase,
];