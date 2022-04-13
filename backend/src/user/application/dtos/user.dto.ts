import { EnumPermits } from 'src/shared/domain/enum.permits';
import { BaseDto } from '../../../shared/core/BaseDto';

export type UserDto = BaseDto & {
    shortName: string;
    fullName: string;
    description: string;
    priority: number;
    roles: EnumPermits[]
    password: string
}