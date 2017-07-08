import * as jwt from 'jsonwebtoken';
import { IJWTPayload } from './auth.d';

const SECRET = 'secret_sauce';

export function getToken(payload: IJWTPayload): string {
  // TODO: get secret from environment variable
  return jwt.sign(payload, SECRET);
}

export function validateToken(token: string): void {

}