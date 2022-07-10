import { LocalDto } from './local.dto';
import { FacultyDto } from '../../../faculty/application/dtos/faculty.dto';

export type LocalDetailsDto = LocalDto & {
  faculty?: FacultyDto;
};