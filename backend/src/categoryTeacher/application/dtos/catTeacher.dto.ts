import { BaseDto } from '../../../shared/core/BaseDto';

export type CatTeacherDto = BaseDto & {
  shortName: string;
  fullName: string;
  description: string;
  priority: number;
  categoryName: string;
}
