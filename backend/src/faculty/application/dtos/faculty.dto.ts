import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { BaseDto } from '../../../shared/core/BaseDto';
import { UniversityDto } from '../../../university/application/dtos/university.dto';

export type FacultyDto = PropsBaseDto & BaseDto & {
  universityId: string;
  university?: UniversityDto;
}
