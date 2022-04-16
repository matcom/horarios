import {EnumPermits} from "@/enums/EnumPermits";
import {EnumStatus} from "@/enums/EnumStatus";

export class UserDto{
    id: string
    createdAt: Date
    updatedAt:Date
    roles: EnumPermits[]
    status: EnumStatus
    email: string
    username: string
}