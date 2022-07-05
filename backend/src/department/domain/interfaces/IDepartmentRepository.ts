import { IRepository } from '../../../shared/core/interfaces/IRepository';
import { Department } from '../entities/department.entity';

export interface IDepartmentRepository extends IRepository<Department> {
  findDetails(id: string): Promise<Department>;
};
