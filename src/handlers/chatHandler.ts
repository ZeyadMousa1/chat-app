import { PrismaClient } from '@prisma/client';
import {
    createChatRequest,
    createChatResponse,
    findChatDetailsRequestParams,
    findChatDetailsResponse,
    findUserChatsRequestParams,
    findUserChatsResponse,
} from '../Api/chat';
import { ExpressHandler } from '../types';
import crypto from 'crypto';

const prisma = new PrismaClient();

export const createChatHandler: ExpressHandler<
    {},
    createChatRequest,
    createChatResponse,
    {}
> = async (req, res, next) => {
    const { secondMember } = req.body;

    const chat = await prisma.chat.findFirst({
        where: {
            members: {
                every: {
                    userId: { in: [res.locals.userId, secondMember] },
                },
            },
        },
    });

    if (chat) res.status(200).json({ chat });

    const newChat = await prisma.chat.create({
        data: {
            id: crypto.randomUUID(),
            members: {
                connect: [{ userId: res.locals.userId }, { userId: secondMember }],
            },
        },
    });

    res.status(200).json({ chat: newChat });
};

export const findUserChats: ExpressHandler<
    findUserChatsRequestParams,
    {},
    findUserChatsResponse,
    {}
> = async (req, res, next) => {
    const { userId } = req.params;

    const chat = await prisma.user.findUnique({
        where: {
            userId,
        },
    });

    if (!chat) {
        return res.status(404).json({ error: 'not chats with this id' });
    }

    const chats = await prisma.chat.findMany({
        where: {
            members: {
                some: {
                    userId: userId,
                },
            },
        },
    });

    return res.status(200).json({ chats });
};

export const findChatDetails: ExpressHandler<
    findChatDetailsRequestParams,
    {},
    findChatDetailsResponse,
    {}
> = async (req, res, next) => {
    const { chatId } = req.params;
    const chat = await prisma.chat.findUnique({
        where: {
            id: chatId,
        },
        include: {
            members: true,
            messages: true,
        },
    });
    if (!chat) {
        return res.status(404).json({ error: 'not chat with this id' });
    }
    return res.status(200).json({ chat });
};
