import { Role } from "./app.enums";

export interface JWTPayload {
    id: number
}


export interface Response<T> {
    success: boolean,
    message: string,
    data: T;
    erorr:T
}