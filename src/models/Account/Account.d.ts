import * as mongoose from 'mongoose';

export type AccountModel = mongoose.Document & {
  userId: string;
  username: string;
  password: string;
  decks: string[];
  comparePassword(candidatePassword: string, cb: (err: any, isMatch: any) => void): void;
};

export type AuthToken = {
  accessToken: string;
  kind: string;
};