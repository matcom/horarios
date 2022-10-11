import { GetClassesByConditions } from './get-class-by-conditions.use-case';
import { BuildWhereUseCase } from './build-where.use-case';
import {
  CreateCountConditionsRestrictionsUseCase,
} from './count-conditions-restrictions/count-conditions.restrictions.create.use-case';
import {
  EvaluateCountConditionsRestrictionsUseCase,
} from './count-conditions-restrictions/count-conditions.restrictions.evaluate.use-case';
import {
  FindAllCountConditionsRestrictionsUseCase,
} from './count-conditions-restrictions/count-conditions.restrictions.find-all.use-case';
import {
  RemoveCountConditionsRestrictionsUseCase,
} from './count-conditions-restrictions/count-condition.restrictions.remove.use-case';
import { RestrictionsEvaluationUseCase } from './restrictions.evaluation.use-case';
import {
  CreateSimpleCountRestrictionUseCase,
} from './simple-count-restrictions/simple.count-restrictions.create.use-case';
import {
  EvaluateSimpleCountRestrictionUseCase,
} from './simple-count-restrictions/simple.count-restrictions.evaluate.use-case';
import {
  FindAllSimpleCountRestrictionsUseCase,
} from './simple-count-restrictions/simple.count-restrictions.find-all.use-case';
import {
  RemoveSimpleCountRestrictionsUseCase,
} from './simple-count-restrictions/simple.count.restrictions.remove.use-case';
import {
  FindByIdCountConditionRestrictionUseCase,
} from './count-conditions-restrictions/count-conditions.restrictions.find-one.use-case';
import {
  FindByIdSimpleCountRestrictionUseCase,
} from './simple-count-restrictions/simple.count-restrictions.find-one.use-case';
import {
  CreateDistributionRestrictionUseCase,
} from './distribution-restrictions/distribution-restrictions.create.use-case';
import {
  EvaluateDistributionRestrictionUseCase,
} from './distribution-restrictions/distribution-restrictions.evaluate.use-case';
import {
  FindAllDistributionRestrictionsUseCase,
} from './distribution-restrictions/distribution-restrictions.find-all.use-case';
import {
  RemoveDistributionRestrictionsUseCase,
} from './distribution-restrictions/distribution-restrictions.remove.use-case';
import {
  FindByIdDistributionRestrictionUseCase,
} from './distribution-restrictions/distribution-restrictions.find-one.use-case';

export * from './get-class-by-conditions.use-case';
export * from './build-where.use-case';

export * from './simple-count-restrictions/simple.count-restrictions.create.use-case';
export * from './simple-count-restrictions/simple.count-restrictions.evaluate.use-case';
export * from './simple-count-restrictions/simple.count-restrictions.find-all.use-case';
export * from './simple-count-restrictions/simple.count.restrictions.remove.use-case';
export * from './simple-count-restrictions/simple.count-restrictions.find-one.use-case';

export * from './count-conditions-restrictions/count-conditions.restrictions.evaluate.use-case';
export * from './count-conditions-restrictions/count-conditions.restrictions.create.use-case';
export * from './count-conditions-restrictions/count-condition.restrictions.remove.use-case';
export * from './count-conditions-restrictions/count-conditions.restrictions.find-all.use-case';
export * from './count-conditions-restrictions/count-conditions.restrictions.find-one.use-case';


export * from './distribution-restrictions/distribution-restrictions.create.use-case';
export * from './distribution-restrictions/distribution-restrictions.evaluate.use-case';
export * from './distribution-restrictions/distribution-restrictions.find-all.use-case';
export * from './distribution-restrictions/distribution-restrictions.find-one.use-case';
export * from './distribution-restrictions/distribution-restrictions.remove.use-case';

export * from './restrictions.evaluation.use-case';

export const RestrictionsUseCases = [
  BuildWhereUseCase,
  GetClassesByConditions,
  RestrictionsEvaluationUseCase,

  CreateSimpleCountRestrictionUseCase,
  EvaluateSimpleCountRestrictionUseCase,
  FindAllSimpleCountRestrictionsUseCase,
  RemoveSimpleCountRestrictionsUseCase,
  FindByIdSimpleCountRestrictionUseCase,

  FindByIdCountConditionRestrictionUseCase,
  CreateCountConditionsRestrictionsUseCase,
  FindAllCountConditionsRestrictionsUseCase,
  EvaluateCountConditionsRestrictionsUseCase,
  RemoveCountConditionsRestrictionsUseCase,

  CreateDistributionRestrictionUseCase,
  EvaluateDistributionRestrictionUseCase,
  FindAllDistributionRestrictionsUseCase,
  RemoveDistributionRestrictionsUseCase,
  FindByIdDistributionRestrictionUseCase,
];