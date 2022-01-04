import { Router } from 'express';
import { Routes } from 'interfaces/routes.interface';
import AuthController from 'controllers/auth.controller';

class AuthRoute implements Routes {
  public path = '/auth/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}signup`,
      //   validationMiddleware(CreateUserDto, 'body'),
      this.authController.signUp
    );
    this.router.get(
      `${this.path}test`,
      //   validationMiddleware(CreateUserDto, 'body'),
      this.authController.test
    ); // this.router.post(
    //   `${this.path}login`,
    //   validationMiddleware(CreateUserDto, 'body'),
    //   this.authController.logIn
    // );
    // this.router.post(
    //   `${this.path}logout`,
    //   authMiddleware,
    //   this.authController.logOut
    // );
  }
}

export default AuthRoute;
