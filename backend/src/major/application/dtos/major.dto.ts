import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { BaseDto } from '../../../shared/core/BaseDto';

export type MajorDto = PropsBaseDto & BaseDto & {
  facultyId: string
  duration: number
}
