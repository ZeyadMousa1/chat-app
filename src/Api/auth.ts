import { User } from '@prisma/client';

export type SignUpRequest = Pick<User, 'userName' | 'email' | 'password'>;
export interface SignUpResponse {
    jwtToken: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}
export interface SignInResponse {
    user: Pick<User, 'userId' | 'email' | 'userName' | 'image' | 'password'>;
    jwtToken: string;
}
