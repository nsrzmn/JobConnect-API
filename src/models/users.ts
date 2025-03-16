import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the model
export interface UserI extends Document {
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// Define the schema
const userSchema = new Schema<UserI>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Define a virtual field for `labelName`
userSchema.virtual("roleName").get(function () {
  if (this.role === 1) return "Admin";
  if (this.role === 2) return "Emoloyer";
  if (this.role === 2) return "User";
  return "";
});

// Create and export the model
export const User = mongoose.model<UserI>("User", userSchema);
