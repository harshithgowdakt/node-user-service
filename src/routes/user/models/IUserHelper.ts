import { IUser } from "../../../db/repositories/models/IUsers";

export interface IUserHelper {
  filterUserInfo(user: IUser): IUser;
}
