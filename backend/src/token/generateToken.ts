import * as jwt from 'jsonwebtoken';
import { config, secret } from './jwtConfig';

// Interface
interface IUser {
  id: number,
  username: string;
  role: string;
  email: string;
  password: string;
}

export default function generateToken(user: IUser): string {
  const { password: PASSWORD, ...payload } = user; // retirando o password
  const token = jwt.sign({ payload }, secret, config);
  return token;
}
