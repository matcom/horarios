import { IRepository } from '../../../shared/core/interfaces/IRepository';
import { Student } from '../../../student/domain/entities/student.entity';

export interface IStudentRepository extends IRepository<Student> {
  findDetails(id: string): Promise<Student>;
};
