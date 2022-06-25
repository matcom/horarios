import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { BaseDto } from '../../../shared/core/BaseDto';

export type DepartmentDto = PropsBaseDto & BaseDto & {
  facultyId?: { id: string };
  teachersIds?: { id: string }[];
}
