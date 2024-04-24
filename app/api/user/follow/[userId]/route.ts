import { getDataFromCookie } from '@/lib/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User, { IUserResponse } from '@/model/userModel';
import { connectDB } from '@/lib/connectdb';
import { StatusCodes } from 'http-status-codes';

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectDB();

    const currentUser = await getDataFromCookie(request);
    if (!currentUser) {
      return new NextResponse('Unauthorized user.', {
        status: StatusCodes.BAD_REQUEST,
      });
    }

    const user = await User.findById<IUserResponse>(currentUser.userId).select(
      '-password'
    );

    if (!user) {
      return new NextResponse('User not found.', {
        status: StatusCodes.BAD_REQUEST,
      });
    }

    const isFollowing = user.following.includes(params.userId);

    if (!isFollowing) {
      await User.findByIdAndUpdate(user._id, {
        $push: { following: params.userId },
      });
    }

    return new NextResponse('Follow successfully!', { status: StatusCodes.OK });
  } catch (error) {
    console.log('[FOLLOW_USER_ERROR]', error);
    return new NextResponse('Something went wrong', {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
