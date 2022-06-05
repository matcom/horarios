import { IRepository } from '../../../shared/core/interfaces/IRepository';
import { Faculty } from '../entities/faculty.entity';

export interface IFacultyRepository extends IRepository<Faculty> {
  findDetails(id: string): Promise<Faculty>;
}