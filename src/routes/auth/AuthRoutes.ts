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
    this.router.post('/auth/login', this.authController.login);
  }
}


