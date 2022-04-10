import { EnumPermits } from "src/shared/domain/enum.permits";

export type UserCreateDto = {
    shortName: string;
    fullName: string;
    description: string;
    priority: number;
    roles: EnumPermits[]
    password: string
    email:string
}