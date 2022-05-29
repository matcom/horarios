import { TeacherDto } from './teacher.dto';
import { FacultyDto } from '../../../faculty/application/dtos/faculty.dto';
import { UniversityDto } from '../../../university/application/dtos/university.dto';

export type TeacherDetailsDto = TeacherDto & {
  faculties: FacultyDto[],
  university?: UniversityDto
}