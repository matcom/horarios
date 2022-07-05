import { IRepository } from '../../../shared/core/interfaces/IRepository';
import { Class } from '../entities/class.entity';

export interface IClassRepository extends IRepository<Class> {
  findDetails(id: string): Promise<Class>;
};
