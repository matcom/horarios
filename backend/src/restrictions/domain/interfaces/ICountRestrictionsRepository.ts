import { IRepository } from '../../../shared/core/interfaces/IRepository';
import { CountRestrictions } from '../entities/count-restriction.entity';

export interface ICountRestrictionsRepository extends IRepository<CountRestrictions> {
  findDetails(id: string): Promise<CountRestrictions>;
};
