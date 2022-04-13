import { EnumPermits } from "src/shared/domain/enum.permits";
import { EnumStatus } from "src/user/domain/enums/enum.status";

export type UserCreateDto = {
    username: string;
    roles: EnumPermits[]
    password: string
    email: string
    status: EnumStatus
}