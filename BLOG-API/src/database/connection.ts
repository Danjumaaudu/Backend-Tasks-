import mongoose from "mongoose";
import config from "../../config/default"
export default async function connect() {
    const {dbURI} = config;
  
    if (!dbURI) {
      console.error("Database URI is not defined in environment variables!");
      process.exit(1);
    }
  
    try {
      await mongoose.connect(dbURI);
      console.log("Database connected");
    } catch (error) {
      console.error(`Could not connect to database: ${error}`);
      process.exit(1);
    }
  }