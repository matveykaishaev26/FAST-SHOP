import { IUser } from "./user.interface";

export interface IAuthLogin {
  email: string;
  password: string;
}
export interface IAuthRegister extends IAuthLogin {
  name: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
export interface IAuthRegisterResponse {
  message: string;
}
export interface IAuthSendPasswordResetResponse extends IAuthRegisterResponse {}
export interface IAuthSendPasswordReset extends Pick<IAuthLogin, "email"> {}
export interface IAuthResetPassword {
  password: string;
  token: string;
}
export interface IAuthResetPasswordResponse extends IAuthRegisterResponse {}
export interface IVerifyToken {
  token: string;
}
export interface IAuthVerifyEmailResponse extends IAuthRegisterResponse {}
