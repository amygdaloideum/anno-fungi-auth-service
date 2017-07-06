import * as jwt from 'jsonwebtoken';
import { IJWTPayload } from './auth.d';

export function getToken(payload: IJWTPayload): string {
  // TODO: get secret from environment variable
  return jwt.sign(payload, 'secret_sauce');
}