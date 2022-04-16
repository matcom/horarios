import { BaseDto } from '../../../shared/core/BaseDto';
import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';

export type FacultyCreateDto = PropsBaseDto & BaseDto & {
  universityId: string;
}