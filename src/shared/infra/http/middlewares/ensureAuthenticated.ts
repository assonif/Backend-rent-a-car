import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      'dbe062b5577b24635fe31c58f5f2e48a',
    ) as JwtPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
