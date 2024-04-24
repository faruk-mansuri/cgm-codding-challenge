import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { StatusCodes } from 'http-status-codes';
import { connectDB } from '@/lib/connectdb';
import { getDataFromCookie } from '@/lib/getDataFromToken';
import User, { IUserResponse } from '@/model/userModel';
import { split } from 'postcss/lib/list';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const PATCH = async (request: NextRequest) => {
  try {
    await connectDB();

    const reqBody = await request.json();
    const { imgUrl } = reqBody;

    if (!imgUrl) {
      return new NextResponse('Image is required..', {
        status: StatusCodes.BAD_REQUEST,
      });
    }

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

    if (user.avatar) {
      const avatarFileName = user.avatar.split('/').pop()?.split('.')[0];
      if (avatarFileName) {
        await cloudinary.v2.uploader.destroy(avatarFileName);
      }
    }

    const response = await cloudinary.v2.uploader.upload(imgUrl);

    await User.findByIdAndUpdate(user._id, { avatar: response.secure_url });

    return NextResponse.json(
      { msg: 'Profile updated successfully', avatar: response.secure_url },
      {
        status: StatusCodes.OK,
      }
    );
  } catch (error) {
    console.log('[UPDATE_IMAGE_ERROR]', error);
    return new NextResponse('Something went wrong', {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
