import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

// creat schema
const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "user"]
        , default: "user"
    },
    address: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
});

// creat model
export const User = model<TUser>('User', userSchema);