import { DepartmentDto } from './department.dto';
import { FacultyDto } from '../../../faculty/application/dtos/faculty.dto';
import { TeacherDto } from '../../../teacher/application/dtos/teacher.dto';

export type DepartmentDetailsDto = DepartmentDto & {
  faculty: FacultyDto,
  teachers: TeacherDto[]
}
