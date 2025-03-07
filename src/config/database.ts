import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();


const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@jobconnect-api.eiifs.mongodb.net/Jobconnect?retryWrites=true&w=majority`;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.log("username: ",process.env.DATABASE_USERNAME);
    console.log("password: ",process.env.DATABASE_PASSWORD);
    
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};
