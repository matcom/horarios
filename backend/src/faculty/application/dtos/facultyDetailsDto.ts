import { FacultyDto } from './faculty.dto';
import { UniversityDto } from '../../../university/application/dtos/university.dto';

export type FacultyDetailsDto = FacultyDto & {
  university: UniversityDto;
}