import config from 'config';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import prisma from '@/utils/client';

const authMiddleware = async (req) => {
  try {
    const Authorization =
      req.cookies['Authorization'] ||
      (req.header('Authorization')
        ? req.header('Authorization').split('Bearer ')[1]
        : null);

    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = (await verify(
        Authorization,
        secretKey
      )) as DataStoredInToken;
      const userId = verificationResponse.id;

      // const users = new PrismaClient().user;
      const findUser = await prisma.user.findUnique({
        where: { id: String(userId) },
      });

      if (findUser) {
        // req.user = findUser;
        return findUser;
        // next();
      } else {
        return false;
        // next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      return false;
      //   next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    return false;
    // next(new HttpException(401, 'Wrong authentication token'));
  }
};

// export const authChecker = async ({ context: { user } }) => {
//     if (!user) {
//       throw new HttpException(404, 'Authentication token missing');
//     }

export default authMiddleware;
