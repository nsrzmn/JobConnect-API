import mongoose from "mongoose";

const uri = `mongodb+srv://nasir:nasir@jobconnect-api.eiifs.mongodb.net/Jobconnect?retryWrites=true&w=majority`;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};
