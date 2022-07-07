import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enum/role-enum";

export const ROLES_KEY = 'roles';
export const Roles = (...Role: Role[]) => SetMetadata(ROLES_KEY, Role);