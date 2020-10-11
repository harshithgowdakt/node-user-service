import { IUser } from "../../db/repositories/models/IUsers";
import { IUserHelper } from "./models/IUserHelper";

export class UserHelper implements IUserHelper {
  filterUserInfo(user: IUser) {
    return {
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin
    }
  }
}
