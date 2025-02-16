import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let conntected = false;
const MONGODB_URI = process.env.MONGODE_URI;
const connectDb = async () => {
  mongoose.set("strictQuery", true);
  if (conntected) {
    console.log("Database already connected");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    conntected = true;
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

export default connectDb;