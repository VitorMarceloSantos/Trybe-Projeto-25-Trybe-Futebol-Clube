export const secret = process.env.JWT_SECRET || 'jwt_secret';

export const config: object = {
  expiresIn: '3h',
  algorithm: 'HS256',
};
