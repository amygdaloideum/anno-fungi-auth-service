export interface ILoginRequestBody {
  username: string;
  password: string;
}

export interface IJWTPayload {
    accountId: string;
    exp: number;
}