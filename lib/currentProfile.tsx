import { connectDB } from './connectdb';
import User, { IUserResponse } from '@/model/userModel';

export const currentProfile = async (
  userId: string
): Promise<IUserResponse | null> => {
  try {
    await connectDB();
    const currentUser: IUserResponse = await User.findById<IUserResponse>(
      userId
    ).select('-password');

    return {
      _id: currentUser._id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber,
      avatar: currentUser.avatar || '',
      userName: currentUser.userName,
      following: currentUser.following,
    };
  } catch (error) {
    return null;
  }
};
