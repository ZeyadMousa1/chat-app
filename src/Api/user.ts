import { User } from '@prisma/client';

export interface findUserRequest {
    userId: string;
}
export interface findUserResponse {
    user: User;
}

export interface findAllUsersReponse {
    users: User[];
}
