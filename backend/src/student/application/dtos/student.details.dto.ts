import { FacultyDto } from '../../../faculty/application/dtos/faculty.dto';
import { UniversityDto } from '../../../university/application/dtos/university.dto';
import { StudentDto } from './student.dto';
import { MajorDto } from '../../../major/application/dtos/major.dto';

export type StudentDetailsDto = StudentDto & {
  faculty: FacultyDto,
  major?: MajorDto
}
