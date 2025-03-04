import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the model
export interface DummyI extends Document {
  userId?: number;
  propertyId?: number;
  labelId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  labelName?: string;
}

// Define the schema
const DummySchema = new Schema<DummyI>(
  {
    userId: { type: Number, required: true },
    propertyId: { type: Number, required: true },
    labelId: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Define a virtual field for `labelName`
DummySchema.virtual("labelName").get(function () {
  if (this.labelId === 1) return "Sold";
  if (this.labelId === 2) return "Rented";
  return "";
});

// Create and export the model
export const Dummy = mongoose.model<DummyI>("Dummy", DummySchema);
