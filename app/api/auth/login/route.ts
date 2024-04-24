import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectdb';
import User from '@/model/userModel';
import { comparePassword } from '@/lib/passwordUtils';
import { StatusCodes } from 'http-status-codes';
import { createJWT } from '@/lib/tokenUtils';

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json(
        {
          msg: 'email and password are required!',
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const user = await User.findOne({ email });
    const isValidUser =
      user && (await comparePassword(password, user.password));

    if (!isValidUser) {
      return new NextResponse('Invalid credentials', { status: 400 });
    }

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
    return new NextResponse('Something went wrong', {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
