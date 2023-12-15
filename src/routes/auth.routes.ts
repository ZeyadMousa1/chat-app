import express from 'express';
import { signInHandler, signUpHandler } from '../handlers/authHandler';
import asyncHandler from 'express-async-handler';

export const authRouter = express.Router();

authRouter.route('/signup').post(asyncHandler(signUpHandler));

authRouter.route('/signin').post(asyncHandler(signInHandler));
