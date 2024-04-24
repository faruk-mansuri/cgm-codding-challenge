import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const getDataFromToken = async (token: string): Promise<string> => {
  const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  return userId;
};

export const getDataFromCookie = async (
  request: NextRequest
): Promise<
  { userId: string; username: string; email: string } | JwtPayload | null
> => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const userId = jwt.verify(token, process.env.JWT_SECRET!);
    return userId as { userId: string; username: string; email: string };
  } catch (error) {
    return null;
  }
};
