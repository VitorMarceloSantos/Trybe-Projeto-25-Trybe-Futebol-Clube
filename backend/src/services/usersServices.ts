import * as bcrypt from 'bcryptjs';
import generateToken from '../token/generateToken';
import usersModel from '../database/models/usersModel';
import { IUserStatus } from '../interfaces/users';

const searchUser = async (email: string, password: string): Promise<IUserStatus> => {
  const user = await usersModel.findOne({ where: { email } });

  if (!user) return { status: 401, message: 'Incorrect email or password' };

  // Verifica Password
  const verifyPassword = await bcrypt.compare(password, user.dataValues.password);
  // Para realizar a verificação deve passar a senha(sem criptografia) e senha criptografada
  if (verifyPassword === false) return { status: 401, message: 'Incorrect email or password' };

  // Gerando o token
  const token = generateToken(user.dataValues);
  return { status: 200, message: token };
};

const searchRole = async (email: string): Promise<IUserStatus> => {
  const userRole = await usersModel.findOne({ where: { email } });

  if (!userRole) {
    return { status: 401, message: 'User not found' };
  }
  return { status: 200, message: userRole.dataValues.role };
};

export default { searchUser, searchRole };
