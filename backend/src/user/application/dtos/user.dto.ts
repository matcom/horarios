import { EnumPermits } from 'src/shared/domain/enum.permits';
import { BaseDto } from '../../../shared/core/BaseDto';
import { EnumStatus } from '../../domain/enums/enum.status';

export type UserDto = BaseDto & {
  username: string;
  roles: EnumPermits[];
  email: string;
  status: EnumStatus;
}