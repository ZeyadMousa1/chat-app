import { ExpressHandler, User } from '../types';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../Api/auth';
import { Prisma, PrismaClient } from '@prisma/client';
import { PasswordServices } from '../utils/passwordService';
import crypto from 'crypto';
import { jwtSign } from '../utils/auth';

const prisma = new PrismaClient();

export const signUpHandler: ExpressHandler<{}, SignUpRequest, SignUpResponse, {}> = async (
    req,
    res,
    next
) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (existing) {
        res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await PasswordServices.hashPassword(password);

    const user: Prisma.UserCreateInput = {
        userId: crypto.randomUUID(),
        email,
        userName,
        password: hashedPassword,
        image: '3dg',
        isOnline: false,
    };

    await prisma.user.create({
        data: user,
    });

    const jwtToken = jwtSign({ userId: user.userId });
    return res.status(200).json({
        jwtToken,
    });
};

export const signInHandler: ExpressHandler<{}, SignInRequest, SignInResponse, {}> = async (
    req,
    res,
    next
) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const existing = await prisma.user.findUnique({ where: { email } });

    const matchPassord = await PasswordServices.comparePassword(password, existing!.password);

    if (!existing || !matchPassord) {
        return res.status(200).json({
            error: 'Email or Password is incorrect',
        });
    }

    const jwtToken = jwtSign({ userId: existing.userId });
    return res.status(200).json({
        user: {
            userId: existing.userId,
            email: existing.email,
            userName: existing.userName,
            image: existing.image,
            password: existing.password,
        },
        jwtToken,
    });
};
