import { SequelizeOrm } from "../config/SequlizeOrm";
import { IUser } from "./models/IUsers";
import { IUserRepository } from "./models/IUserRepository";
import { IOrm } from "../models/IOrm";

export class UserRepository implements IUserRepository {
  private dbInstance: any;

  constructor(orm: IOrm) {
    this.dbInstance = orm.getOrmInstance();
  }

  async getUserByEmail(email: string) {
    try {
      let user = await this.dbInstance.User.findOne(
        { where: { email: email } }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: number) {
    try {
      let user = await this.dbInstance.User.findOne(
        { where: { userId: userId } }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: IUser) {
    try {
      let userData = await this.dbInstance.User.create(user);
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(user: IUser) {
    try {
      let userData = await this.dbInstance.User.update(
        user,
        { where: { email: user.email } }
      );
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(email: string) {
    try {
      let userData = await this.dbInstance.User.destroy(
        { where: { email: email } }
      );
      return userData;
    } catch (error) {
      throw error;
    }
  }
}
