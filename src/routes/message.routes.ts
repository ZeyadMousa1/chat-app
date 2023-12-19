import express from 'express';
import asyncHandler from 'express-async-handler';
import { createMessageHandler, getMessagesHandler } from '../handlers/messageHandler';

export const messageRouter = express.Router();

messageRouter.route('/').post(asyncHandler(createMessageHandler));
messageRouter.route('/:chatId').get(asyncHandler(getMessagesHandler));
