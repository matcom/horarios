import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { BaseDto } from '../../../shared/core/BaseDto';

export type StudentDto = PropsBaseDto & BaseDto & {
  email: string;
  year: number;
}
