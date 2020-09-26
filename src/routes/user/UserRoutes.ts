import { Router } from "express";
import { IUserController } from "./models/IUserController";
import { IRoutes } from "../models/IRoutes";
export class UserRoutes implements IRoutes {
  router: Router;
  private userController: IUserController;

  constructor(Controller: IUserController) {
    this.router = Router();
    this.userController = Controller;
  }

  public intializeRoutes() {
    this.router.get('/users/:id', (req, res, next) => {
      this.userController.getUserByEmailId(req, res, next);
    });
    this.router.post('/users', (req, res, next) => {
      this.userController.createUser(req, res, next)
    });
    this.router.put('/users/:id', (req, res, next) => {
      this.userController.updateUser(req, res, next)
    });
    this.router.delete('/users/:id', (req, res, next) => {
      this.userController.deleteUser(req, res, next)
    })
  }
}
