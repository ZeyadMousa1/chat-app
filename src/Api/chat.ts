import { Chat, User } from '@prisma/client';

export interface createChatRequest {
    // firstMember: string;
    secondMember: string;
}

export interface createChatResponse {
    chat: Chat;
}

export interface findUserChatsRequestParams {
    userId: string;
}

export interface findUserChatsResponse {
    chats: Chat[];
}

export interface findChatDetailsRequestParams {
    chatId: string;
}

export interface findChatDetailsResponse {
    chat: Chat;
}
