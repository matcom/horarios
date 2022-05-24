import { TeacherDto } from './teacher.dto';

export type TeacherCreateDto = TeacherDto & {
  teacherFaculties: [{ id: string }];
};