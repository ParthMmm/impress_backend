import { Context } from './../utils/context';
import { NextFunction, Request, Response } from 'express';
import IndexService from '@/services/index.service';
// import { User } from '@prisma/client';

import { User, sanitizedUser } from '@/interfaces/user.interface';

class IndexController {
  // public IndexService = new IndexService();

  public index = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.send({ message: 'hi' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
