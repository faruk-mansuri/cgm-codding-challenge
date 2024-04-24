import jwt, { JwtPayload } from 'jsonwebtoken';

export interface TokenUser {
  userId: string;
  username: string;
  email: string;
}

export const createJWT = (payload: JwtPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token: string): TokenUser => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenUser;
  return decoded;
};
