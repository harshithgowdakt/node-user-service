import { sign } from "jsonwebtoken";
import jwt from "express-jwt";
import { IUser } from "../../db/repositories/models/IUsers";

class Jwt {

  private static instance: Jwt;

  generateToken(user: IUser) {
    let payload = {
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked
    }
    return sign(payload, "1234", { expiresIn: "1d", });
  }

  verifyToken() {
    return jwt({ secret: "1234" });
  }

  static get Instnce(): Jwt {
    if (!this.instance) {
      this.instance = new Jwt()
    }
    return this.instance;
  }
}

export let jwtInstance = Jwt.Instnce
