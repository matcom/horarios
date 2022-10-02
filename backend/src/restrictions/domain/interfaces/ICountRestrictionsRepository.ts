import { IRepository } from '../../../shared/core/interfaces/IRepository';
import { SimpleCountRestrictions } from '../entities/count-restriction.entity';

export interface ICountRestrictionsRepository extends IRepository<SimpleCountRestrictions> {
  findDetails(id: string): Promise<SimpleCountRestrictions>;
};
