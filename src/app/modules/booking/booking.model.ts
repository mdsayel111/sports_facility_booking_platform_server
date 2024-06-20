import mongoose, { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

// creat schema
const bookingSchema = new Schema<TBooking>({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  // facility will be _id of Facility collection
  facility: { type: mongoose.Schema.ObjectId, required: true, ref: "Facility" },
  payableAmount: { type: Number },
  isBooked: {
    type: String,
    enum: ["confirmed", "unconfirmed", "canceled"],
    default: "confirmed",
  },
  // user will be _id of User collection
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
});

// creat model
export const Booking = model<TBooking>("Booking", bookingSchema);
