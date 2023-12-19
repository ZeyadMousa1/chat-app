import express from 'express';
import asyncHandler from 'express-async-handler';
import { createChatHandler, findChatDetails, findUserChats } from '../handlers/chatHandler';
import { authMiddelware } from '../middelwares/auth';

export const chatRouter = express.Router();

chatRouter.route('/').post(authMiddelware, asyncHandler(createChatHandler));

chatRouter.route('/user/:userId').get(asyncHandler(findUserChats));

chatRouter.route('/:chatId').get(asyncHandler(findChatDetails));
