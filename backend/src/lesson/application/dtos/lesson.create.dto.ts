import { LessonDto } from './lesson.dto';

export type LessonCreateDto = Omit<LessonDto, 'id' | 'createdAt' | 'updatedAt'> & {
  majorId: { id: string },
  localId: { id: string },
  teacherId: { id: string }
};
