import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { BaseDto } from '../../../shared/core/BaseDto';

export type TeachYearDto = PropsBaseDto & BaseDto & {
  duration: number;
}
