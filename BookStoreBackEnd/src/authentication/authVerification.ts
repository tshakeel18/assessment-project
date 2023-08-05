import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface UserPayload {
 id: number | string;
 name: string;
 iat?: number;
 exp?: number;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'secret_key', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    console.log(user)
    req.body.user = user as UserPayload;
    next();
  });
}

