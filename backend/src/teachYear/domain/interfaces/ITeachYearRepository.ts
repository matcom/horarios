import { IRepository } from '../../../shared/core/interfaces/IRepository';
import { TeachYear } from '../entities/teachYear.entity';

export interface ITeachYearRepository extends IRepository<TeachYear> {
  findDetails(id: string): Promise<TeachYear>;
};
