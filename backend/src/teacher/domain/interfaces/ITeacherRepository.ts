import { IRepository } from '../../../shared/core/interfaces/IRepository';
import { Teacher } from '../entities/teacher.entity';

export interface ITeacherRepository extends IRepository<Teacher> {
  findDetails(id: string): Promise<Teacher>;
};
