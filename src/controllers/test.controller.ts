import { Context } from './../utils/context';
import { NextFunction, Request, Response } from 'express';
import IndexService from '@/services/index.service';
// import { User } from '@prisma/client';

import { User, sanitizedUser } from '@/interfaces/user.interface';

class TestController {
  //   public IndexService = new IndexService();

  public index = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.send({ message: 'test' });
    } catch (error) {
      next(error);
    }
  };
}

export default TestController;
