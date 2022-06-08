import { LessonDto } from './lesson.dto';
import { LocalDto } from '../../../local/application/dtos/local.dto';
import { MajorDto } from '../../../major/application/dtos/major.dto';
import { TeacherDto } from '../../../teacher/application/dtos/teacher.dto';
import { TeacherDetailsDto } from '../../../teacher/application/dtos/teacher.details.dto';

export type LessonDetailsDto = LessonDto & {
  local?: LocalDto;
  major?: MajorDto;
  teacher?: TeacherDetailsDto;
}