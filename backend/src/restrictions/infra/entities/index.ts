import { SimpleCountRestrictionsPersistence } from './simple-count-restrictions.persistence';
import { CountConditionsRestrictionsPersistence } from './count-conditions.restrictions.persistence';
import { DistributionRestrictionsPersistence } from './distribution-restriction.persistence';

export const RestrictionsPersistence = [
  SimpleCountRestrictionsPersistence,
  CountConditionsRestrictionsPersistence,
  DistributionRestrictionsPersistence,
];