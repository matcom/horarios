import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { BaseDto } from '../../../shared/core/BaseDto';

export type LessonDto = PropsBaseDto & BaseDto & {
  duration: number;
  teacherId: string;
  localId: string;
  majorId: string;
}