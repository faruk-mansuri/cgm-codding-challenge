import mongoose from 'mongoose';
import { connectDB } from './connectdb';
import User from '@/model/userModel';

export interface IAllUserResponse {
  data: User[];
  metaData: {
    page: number;
    totalNumberOfPages: number;
    usersPerPage: number;
  };
}

export interface User {
  _id: string;
  userName: string;
  email: string;
  avatar?: string;
}

interface GetUsersType {
  userId: string;
  page: number;
}
export const getAllUsers = async ({
  userId,
  page,
}: GetUsersType): Promise<IAllUserResponse | null> => {
  try {
    await connectDB();

    const currentPage = page || 1;
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    const users: User[] = await User.find({
      _id: { $ne: new mongoose.Types.ObjectId(userId) },
    })
      .select('userName firstName email avatar')
      .skip(skip)
      .limit(10);

    const totalUsers = await User.countDocuments();
    const totalNumberOfPages = Math.ceil(totalUsers / limit);

    return {
      data: users,
      metaData: { page: currentPage, totalNumberOfPages, usersPerPage: limit },
    };
  } catch (error) {
    return null;
  }
};
