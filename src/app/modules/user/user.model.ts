import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

// creat schema
const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  isDeleted: { type: Boolean, required: false, select: false },
});

// creat model
export const User = model<TUser>("User", userSchema);
