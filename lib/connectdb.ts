import mongoose, { type Connection } from 'mongoose';

let cachedConnection: Connection | null = null;

export async function connectDB() {
  if (cachedConnection) {
    console.log('Using cached MONGODB connection');
    return cachedConnection;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL!);
    cachedConnection = conn.connection;
    console.log('New mongodb connection established');
    return cachedConnection;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
