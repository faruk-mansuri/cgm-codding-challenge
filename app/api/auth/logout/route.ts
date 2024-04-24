import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const response = NextResponse.json(
      { msg: 'user logged out!' },
      { status: StatusCodes.OK }
    );

    response.cookies.set('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    return response;
  } catch (error) {
    console.log('[LOGOUT_ERROR]', error);
    return new NextResponse('Something went wrong', {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
