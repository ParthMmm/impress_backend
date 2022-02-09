import { Router } from 'express';
import TestController from 'controllers/test.controller';
import { Routes } from 'interfaces/routes.interface';

class TestRoute implements Routes {
  public path = '/test';
  public router = Router();
  public testController = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.testController.index);
  }
}

export default TestRoute;
