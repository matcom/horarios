import { BaseDto } from '../../../shared/core/BaseDto';
import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';

export type GroupDto = BaseDto & PropsBaseDto & {
  year: number;
  majorId?: string;
}