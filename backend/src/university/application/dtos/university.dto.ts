import { BaseDto } from '../../../shared/core/BaseDto';

export type UniversityDto = BaseDto & {
  shortName: string;
  fullName: string;
  description: string;
  priority: number;
}