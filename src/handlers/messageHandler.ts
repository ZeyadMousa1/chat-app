import { PrismaClient } from '@prisma/client';
import {
    CreateMessgaeRequest,
    CreateMessgaeResponse,
    GetMessageRequestParams,
    GetMessageResponse,
} from '../Api/message';
import { ExpressHandler } from '../types';
import crypto from 'crypto';

const prsima = new PrismaClient();

export const createMessageHandler: ExpressHandler<
    {},
    CreateMessgaeRequest,
    CreateMessgaeResponse,
    {}
> = async (req, res, next) => {
    const { chatId, senderId, content } = req.body;
    if (!chatId || !senderId || !content) {
        return res.status(404).json({ error: 'data required to send message' });
    }

    const chatHasSender = await prsima.chat.findUnique({
        where: {
            id: chatId,
            members: {
                some: {
                    userId: senderId,
                },
            },
        },
    });

    if (!chatHasSender) {
        return res.status(404).json({ error: 'you dosent access in this chat' });
    }

    const message = await prsima.message.create({
        data: {
            id: crypto.randomUUID(),
            chatId,
            senderId,
            content,
        },
    });
    res.status(200).json({ message });
};

export const getMessagesHandler: ExpressHandler<
    GetMessageRequestParams,
    {},
    GetMessageResponse,
    {}
> = async (req, res, next) => {
    const { chatId } = req.params;
    const messages = await prsima.message.findMany({
        where: {
            chatId,
        },
    });
    if (!messages) {
        return res.status(404).json({ error: 'not chats with this id' });
    }
    return res.status(200).json({
        messgaes: messages,
    });
};
