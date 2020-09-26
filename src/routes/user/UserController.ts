import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { validation } from "../../validation/Validation";
import { UserRepository } from "../../db/repositories/UserRepository";
import { IUserController } from './models/IUserController';

export class UserController implements IUserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserByEmailId(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userRepository.getUserByEmail(req.params.id);
      if (user == null) return res.status(400).send('User not regestered');
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = validation.validateUser({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      });

      if (error) return res.status(400).send(error.details[0].message);

      const isUser = await this.userRepository.getUserByEmail(req.body.email);
      if (isUser != null) return res.status(400).send('User already regestered');

      let userReq: any;
      userReq = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      }

      if (req.body.isAdmin) userReq.isAdmin = req.body.isAdmin;

      let hashedPassword = await bcrypt.hash(userReq.password, 10);
      userReq.password = hashedPassword;
      let user = await this.userRepository.createUser(userReq);

      res.status(200).send(user);

    } catch (error) {
      next();
    }

  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      let isUser = await this.userRepository.getUserByEmail(req.params.id);
      if (!isUser) return res.status(400).send('User not regestered');
      let result;
      if (req.body.userName) {
        result = validation.validateUserName(req.body.userName);
      } else if (req.body.email) {
        result = validation.validateEmail(req.body.email);
      } else if (req.body.password) {
        result = validation.validatePassword(req.body.password);
      }

      if (result?.error) return res.status(400).send(result?.error.details[0].message);

      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;

      let user = await this.userRepository.updateUser(req.body);
      res.status(200).send(user);
    } catch (error) {
      next();
    }

  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const isUser = await this.userRepository.getUserByEmail(req.params.id);
      if (!isUser) return res.status(400).send('User not regestered');
  
      let user = await this.userRepository.deleteUser(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      next();
    }
  }
}


