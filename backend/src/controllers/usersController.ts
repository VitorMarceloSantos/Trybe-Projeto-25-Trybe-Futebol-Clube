import { Request, Response } from 'express';
import usersServices from '../services/usersServices';

const searchUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, message } = await usersServices.searchUser(email, password);
  return status === 200
    ? res.status(status).json({ token: message })
    : res.status(status).json({ message });
};

const validateUser = async (req: Request, res: Response) => {
  const { payload: { email } } = req.body.user; // pegando o email do decoded(validação do token)
  const { status, message } = await usersServices.searchRole(email);
  return res.status(status).json({ role: message });
};

export default { searchUser, validateUser };
