import { TeacherDto } from './teacher.dto';

export type TeacherUpdateDto = Omit<Partial<TeacherDto>, 'id'> & {
  teacherId: string;
};