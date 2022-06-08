import { LessonDto } from './lesson.dto';

export type LessonUpdateDto = Omit<Partial<LessonDto>, 'id'> & {
  lessonId: string;
  majorId: { id: string },
  localId: { id: string },
  teacherId: { id: string }
};
