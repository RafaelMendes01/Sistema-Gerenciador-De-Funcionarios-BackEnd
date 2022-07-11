import { Role } from "src/enum/role-enum";

export interface UserPayload{
    sub?: Number;
    email: string;
    name: string;
    role: Role;
    iat?: number;
    exp?: Number;
}