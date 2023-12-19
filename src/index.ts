import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { chatRouter } from './routes/chat.routes';
import morgan from 'morgan';

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello node app');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/chats', chatRouter);

app.listen(process.env.PORT, () => console.log('Chat App Start...'));
