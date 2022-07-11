import { UserPayload } from "./user-payload"
export interface JwtPayload {
    user: UserPayload 
    iat?: number
    exp?: number
}