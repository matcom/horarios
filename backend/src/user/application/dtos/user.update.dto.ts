import { EnumPermits } from "src/shared/domain/enum.permits";
import { EnumStatus } from "src/user/domain/enums/enum.status";

export type UserUpdateDto = {
    id: string
    data: {
        username: string;
        roles: EnumPermits[]
        password: string
        status: EnumStatus
    }
}