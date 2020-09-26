import * as bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express';
import { IAuthController } from './models/IAuthController';
import { IUserRepository } from "../../db/repositories/models/IUserRepository";
import { jwtInstance } from "../../config/jwt/Jwt";

export class AuthController implements IAuthController {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    let user = await await this.userRepository.getUserByEmail(req.body.email);
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');
    let token = jwtInstance.generateToken(user);

    res.header('x-auth-token', token).send({
      name: user.userName,
      email: user.email
    });
  }
}


