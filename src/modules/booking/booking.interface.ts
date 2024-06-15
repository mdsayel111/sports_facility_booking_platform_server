import mongoose, { Types } from "mongoose";

// creat isBooked type
type isBooked = "confirmed" | "unconfirmed" | "canceled"

// creat booking type
export type TBooking = {
    _id: Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    user: mongoose.Types.ObjectId;
    facility: Types.ObjectId;
    payableAmount: number;
    isBooked: isBooked;
    isDeleted: boolean;
};
