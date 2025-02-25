export interface IApiError {
  data: { statusCode: number; message: string; error: string };
}

export interface IRefreshResponse {
  accessToken: string;
}
