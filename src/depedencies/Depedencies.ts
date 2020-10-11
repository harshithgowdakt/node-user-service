import { SequelizeOrm } from "../db/config/SequlizeOrm";
import { AuthRoutes } from '../routes/auth/AuthRoutes'
import { UserRoutes } from "../routes/user/UserRoutes"
import { UserController } from "../routes/user/UserController"
import { AuthController } from "../routes/auth/AuthController";
import { UserRepository } from "../db/repositories/UserRepository"
import { UserHelper } from "../routes/user/UserHelper";

let userRepository =
  new UserRepository(
    SequelizeOrm.Instance
  );

let userController =
  new UserController(
    userRepository,
    new UserHelper()
  );

let authController =
  new AuthController(
    userRepository
  );
  
export let depedencies =
  [
    new AuthRoutes(
      authController
    ),
    new UserRoutes(
      userController
    )
  ]
