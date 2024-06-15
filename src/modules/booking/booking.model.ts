import mongoose, { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

// creat schema
const bookingSchema = new Schema<TBooking>({
    date: { type: Date, required: true },
    endTime: { type: String, required: true, unique: true },
    startTime: { type: String, required: true },
    // facility will be _id of Facility collection
    facility: { type: mongoose.Schema.ObjectId, required: true, ref: "Facility" },
    payableAmount: { type: Number, required: true },
    isBooked: { type: String, enum: ["confirmed", "unconfirmed", "canceled"], required: true },
    // user will be _id of User collection
    user: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    isDeleted: { type: Boolean, required: false },
});

// creat model
export const Booking = model<TBooking>("Booking", bookingSchema);
