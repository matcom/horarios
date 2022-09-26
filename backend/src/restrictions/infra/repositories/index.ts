import { CountConditionsRestrictionsRepository } from './count-conditions.restrictions.repository';
import { SimpleCountRestrictionsRepository } from './simple-count-restrictions-repository.service';

export const RestrictionsRepositories = [
  SimpleCountRestrictionsRepository,
  CountConditionsRestrictionsRepository,
];