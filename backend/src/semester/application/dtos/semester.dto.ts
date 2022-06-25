import { BaseDto } from '../../../shared/core/BaseDto';

export type SemesterDto = BaseDto & {
  shortName: string;
  fullName: string;
  description: string;
  priority: number;
  duration: number;
}