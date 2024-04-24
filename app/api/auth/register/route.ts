import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectdb';
import User, { IUser } from '@/model/userModel';
import { hashPassword } from '@/lib/passwordUtils';
import { StatusCodes } from 'http-status-codes';
import { createJWT } from '@/lib/tokenUtils';

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { firstName, lastName, email, userName, password, phoneNumber } =
      reqBody as IUser;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !userName ||
      !phoneNumber ||
      !password
    ) {
      return NextResponse.json(
        {
          msg: 'firstName, lastName, email, userName, phoneNumber and password are required!',
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists)
      return NextResponse.json(
        {
          msg: 'user already exists',
        },
        { status: StatusCodes.BAD_REQUEST }
      );

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      userName,
      phoneNumber,
      password: hashedPassword,
    });

    const token = createJWT({
      userId: user._id,
      username: user.userName,
      email: user.email,
    });

    const oneDay = 1000 * 60 * 60 * 24 * 30; // month
    const response = NextResponse.json({ msg: 'Login successfully' });
    response.cookies.set('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.log('[INTERNAL_SERVER_ERROR]', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};
