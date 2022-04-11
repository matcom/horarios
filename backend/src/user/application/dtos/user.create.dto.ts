import { EnumPermits } from "src/shared/domain/enum.permits";
import { EnumStatus } from "src/user/domain/enums/enum.status";

export type UserCreateDto = {
    shortName: string;
    fullName: string;
    description: string;
    priority: number;
    roles: EnumPermits[]
    password: string
    email: string
    status: EnumStatus
}