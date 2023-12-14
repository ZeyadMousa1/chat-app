import jwt from 'jsonwebtoken';
import { PayLoadObject } from '../types';

export function jwtSign(payLoad: PayLoadObject): string {
   return jwt.sign(payLoad, getJwtSecret(), { expiresIn: '15d' });
}

function getJwtSecret(): string {
   const secret = process.env.JWT_SECRET;
   if (!secret) {
      console.error('Missing jwt secret');
      process.exit(1);
   }
   return secret;
}
