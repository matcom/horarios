import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';

export type FacultyUpdateDto = Partial<PropsBaseDto> & {
  facultyId: string;
  universityId?: string;
};