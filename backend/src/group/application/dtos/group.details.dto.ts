import { GroupDto } from './group.dto';
import { MajorDto } from '../../../major/application/dtos/major.dto';

export type GroupDetailsDto = GroupDto & {
  major: MajorDto;
}