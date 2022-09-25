import { BaseRestrictionsDto } from '../base-restrictions.dto';

export type CountRestrictionsDto = BaseRestrictionsDto & {
  min: number;
  part: number;
  operator: string;
}