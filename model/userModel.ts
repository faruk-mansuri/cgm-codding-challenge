import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userName: string;
  avatar?: string;
  following: mongoose.Types.ObjectId[];
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, 'Invalid phone number.'],
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    following: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model('User', userSchema);

export default User;

export interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userName: string;
  avatar?: string;
  following: string[];
}
