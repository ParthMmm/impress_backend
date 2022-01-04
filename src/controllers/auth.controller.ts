import { NextFunction, Request, Response } from 'express';
// import { User } from '@prisma/client';
// // import { CreateUserDto } from '@dtos/users.dto';
// import { RequestWithUser } from 'interfaces/auth.interface';
import AuthService from 'services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.status(200).json({ message: 'yo' });
    } catch (error) {
      next(error);
    }
  };

  public test = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData = await this.authService.signup();

      res.status(200).json({ data: userData, message: '🍕' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
