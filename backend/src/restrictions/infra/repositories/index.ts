import { CountConditionsRestrictionsRepository } from './count-conditions.restrictions.repository';
import { SimpleCountRestrictionsRepository } from './simple-count-restrictions-repository.service';
import { DistributionRestrictionsRepository } from './distribution-restrictions.repository';

export const RestrictionsRepositories = [
  SimpleCountRestrictionsRepository,
  CountConditionsRestrictionsRepository,
  DistributionRestrictionsRepository
];