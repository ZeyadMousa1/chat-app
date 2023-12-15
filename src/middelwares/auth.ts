import { PrismaClient } from '@prisma/client';
import { ExpressHandler } from '../types';
import { verifyJwt } from '../utils/auth';
import { error } from 'console';

const prisma = new PrismaClient();

export const authMiddelware: ExpressHandler<{}, {}, {}, {}> = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    try {
        const payLoad = verifyJwt(token);
        const currentUser = await prisma.user.findUnique({
            where: {
                userId: payLoad.userId,
            },
        });
        if (!currentUser) {
            return res.status(400).json({ error: 'User not found' });
        }
        (req as any).currentUser = currentUser;
        res.locals.userId = currentUser.userId;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Bad token' });
    }
};
