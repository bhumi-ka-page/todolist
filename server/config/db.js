import mongoose from "mongoose";

export default async function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to server/.env before starting the API.");
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
