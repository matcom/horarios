import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { BaseDto } from '../../../shared/core/BaseDto';

export type TeachActivityDto = PropsBaseDto & BaseDto & {
  duration: number;
}
