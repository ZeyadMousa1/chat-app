import { PrismaClient } from '@prisma/client';
import { findAllUsersReponse, findUserRequest, findUserResponse } from '../Api/user';
import { ExpressHandler } from '../types';

const prisma = new PrismaClient();

export const findUser: ExpressHandler<findUserRequest, {}, findUserResponse, {}> = async (
    req,
    res,
    next
) => {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            userId,
        },
    });
    if (!user) {
        return res.status(400).json({ error: `Not user with this id ${userId}` });
    }

    return res.status(200).json({
        user: user,
    });
};

export const findAllUsers: ExpressHandler<{}, {}, findAllUsersReponse, {}> = async (
    req,
    res,
    next
) => {
    const users = await prisma.user.findMany({});
    res.status(200).json({
        users,
    });
};
