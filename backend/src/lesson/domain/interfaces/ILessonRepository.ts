import { IRepository } from '../../../shared/core/interfaces/IRepository';
import { Lesson } from '../entities/lesson.entity';

export interface ILessonRepository extends IRepository<Lesson> {
  findDetails(id: string): Promise<Lesson>;
};
