import Joi from 'joi'
import { IUser } from "../db/repositories/models/IUsers";
class Validation {
  private static instance: Validation;

  private userDataSchema() {
    return Joi.object({
      userName: this.userNameSchema(),
      email: this.emailSchema(),
      password: this.passwordSchema()
    });
  }

  private userNameSchema() {
    return Joi.string()
      .min(5)
      .max(30)
      .required();
  }

  private emailSchema() {
    return Joi.string()
      .min(5)
      .max(50)
      .email();
  }
  private passwordSchema() {
    return Joi.string()
      .min(5)
      .max(255)
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
  }

  validateUser(userData: IUser) {
    return this.userDataSchema().validate(userData);
  }

  validateEmail(email: string) {
    return this.emailSchema().validate(email);
  }

  validatePassword(password: string) {
    return this.passwordSchema().validate(password);
  }

  validateUserName(userName: string) {
    return this.userNameSchema().validate(userName);
  }

  static get Instance(): Validation {
    if (!this.instance) {
      this.instance = new Validation();
    }
    return this.instance;
  } 

}

export let validation = Validation.Instance; 
