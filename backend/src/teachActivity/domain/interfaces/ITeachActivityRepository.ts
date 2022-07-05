import { IRepository } from '../../../shared/core/interfaces/IRepository';
import { TeachActivity } from '../entities/teachActivity.entity';

export interface ITeachActivityRepository extends IRepository<TeachActivity> {
  findDetails(id: string): Promise<TeachActivity>;
};
