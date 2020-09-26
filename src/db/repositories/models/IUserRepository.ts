import { IUser } from './IUsers';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<any>;
  getUserById(userId: number): Promise<any>;
  createUser(user: IUser): Promise<any>;
  updateUser(user: IUser): Promise<any>;
  deleteUser(email: string): Promise<any>;
}
