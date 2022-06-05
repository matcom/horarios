import { BaseDto } from '../../../shared/core/BaseDto';
import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';

export type MajorCreateDto = PropsBaseDto & BaseDto & {
  facultyId: string
  duration: number
}
