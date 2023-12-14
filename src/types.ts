import { RequestHandler } from 'express';

export interface User {
    userId: string;
    userName: string;
    email: string;
    image?: string;
    // password: string;
    isOnline?: boolean;
}

export interface Chat {
    chatId: string;
    message: string;
    senderId: number;
    receiverId: number;
}

export interface PayLoadObject {
    userId: string;
}

export type withError<T> = T & { error: string };

export type ExpressHandler<Params, Req, Res, Query> = RequestHandler<
    Partial<Params>,
    Partial<withError<Res>>,
    Partial<Req>,
    Partial<Query>
>;
