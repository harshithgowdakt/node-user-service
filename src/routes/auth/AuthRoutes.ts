import { Router } from "express";
import { IRoutes } from "../models/IRoutes"
import { IAuthController } from "./models/IAuthController";

export class AuthRoutes implements IRoutes {
  router: Router;
  private authController :IAuthController;
  
  constructor(Controller: IAuthController) {
    this.router = Router();
    this.authController = Controller;
  }

  public intializeRoutes() {
    this.router.post('/api/v1/auth/login', (req, res, next) => {
      this.authController.login(req, res, next);
    });
  }
}


