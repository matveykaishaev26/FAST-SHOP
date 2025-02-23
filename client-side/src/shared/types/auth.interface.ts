import { IUser } from "./user.interface";

export enum AuthEnum {
  LOGIN = "login",
  REGISTER = "register",
}
export interface IAuthLogin {
  email: string;
  password: string;
}
export interface IAuthRegister extends IAuthLogin {
  name: string;
}
export interface IAuthForm {
  name: string;
  email: string;
  password: string;
}
export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

export interface IAuthRegisterResponse {
  message: string;
}

