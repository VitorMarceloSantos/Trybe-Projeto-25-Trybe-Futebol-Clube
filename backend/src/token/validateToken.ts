import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { secret } from './jwtConfig';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers; // alterando o nome para token
  // passar no header do thunderClient : authorization - token
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    // Fazendo a decodificação
    const decoded = jwt.verify(token, secret); // vai receber as informações do usuario(name, id, email)
    // Colocamos ele em um campo no objeto req.body, Dessa forma, o usuário estará disponível para outros middlewares.
    req.body.user = decoded;
    next();
  } catch (err: unknown) {
    return res.status(401).json({ message: 'Token must be a valid token' }); // caso o token seja invalido vai cair nesse caso
  }
}
