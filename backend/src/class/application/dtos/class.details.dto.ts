import { ClassDto } from './class.dto';
import { TeacherDto } from '../../../teacher/application/dtos/teacher.dto';
import { LessonDto } from '../../../lesson/application/dtos/lesson.dto';
import { LocalDto } from '../../../local/application/dtos/local.dto';
import { TypeclassDto } from '../../../typeclass/application/dtos/typeclass.dto';
import { GroupDto } from '../../../group/application/dtos/group.dto';

export type ClassDetailsDto = ClassDto & {
  teachers?: TeacherDto[],
  lesson?: LessonDto,
  local?: LocalDto,
  typeClass?: TypeclassDto,
  group?: GroupDto;
}
