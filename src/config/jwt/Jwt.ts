import { sign, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../../db/repositories/models/IUsers";
import * as config from "../config.json";

class Jwt {

  private static instance: Jwt;

  generateToken(user: IUser) {
    let payload = {
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked
    }
    return sign(payload, config.jwt.secreteKey, { expiresIn: "1d" });
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {
    if (!config.excludeAuth.includes(req.path)) {
      if (req.header("authorization")) {
        try {
          let token = req.header("authorization") as string;
          verify(token, config.jwt.secreteKey);
          next();
        } catch (error) {
          return res.status(400).send(error.message);
        }
      } else {
        return res.status(401).send();
      }
    }
    next()
  }


  verifyAdminToken(req: Request, res: Response, next: NextFunction) {
    if (config.adminApis.includes(req.path)) {
      if (req.header("authorization")) {
        try {
          let token = req.header("authorization") as string;
          let user = verify(token, config.jwt.secreteKey) as IUser;
          if (!user.isAdmin) {
            return res.status(401).send();
          }
          next();
        } catch (error) {
          return res.status(400).send(error.message);
        }
      } else {
        return res.status(401).send();
      }
    }
    next()
  }

  static get Instnce(): Jwt {
    if (!this.instance) {
      this.instance = new Jwt()
    }
    return this.instance;
  }
}

export let jwtInstance = Jwt.Instnce
