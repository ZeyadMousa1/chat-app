import express from 'express';
import asyncHandler from 'express-async-handler';
import { findAllUsers, findUser } from '../handlers/userHandler';
import { authMiddelware } from '../middelwares/auth';

export const userRouter = express.Router();

userRouter.route('/:userId').get(asyncHandler(findUser));

userRouter.route('/').get(authMiddelware, asyncHandler(findAllUsers));
