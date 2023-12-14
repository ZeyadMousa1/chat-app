import express from 'express';
import { signInHandler, signUpHandler } from '../handlers/authHandler';
import asyncHandler from 'express-async-handler';

export const userRouter = express.Router();

userRouter.route('/signup').post(asyncHandler(signUpHandler));

userRouter.route('/signin').post(asyncHandler(signInHandler));
