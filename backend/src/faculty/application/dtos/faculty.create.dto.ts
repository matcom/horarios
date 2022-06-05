import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';

export type FacultyCreateDto = PropsBaseDto & {
  universityId: string;
}