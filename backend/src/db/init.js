import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL;
  console.log(DATABASE_URL);
  mongoose.connection.on("open", () => {
    console.log("Successfully connected to database:", DATABASE_URL);
  });
  const connection = mongoose.connect(DATABASE_URL);
  return connection;
}
