import { CountRestrictionsDto } from './count-restrictions.dto';

export type CountRestrictionsCreateDto = CountRestrictionsDto & {
  conditions: string;
};