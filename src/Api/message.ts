import { Message } from '@prisma/client';

export interface CreateMessgaeRequest {
    chatId: string;
    senderId: string;
    content: string;
}
export interface CreateMessgaeResponse {
    message: Message;
}

export interface GetMessageRequestParams {
    chatId: string;
}
export interface GetMessageResponse {
    messgaes: Message[];
}
