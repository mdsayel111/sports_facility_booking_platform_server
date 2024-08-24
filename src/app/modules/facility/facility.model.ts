import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";

// creat schema
const facilitySchema = new Schema<TFacility>({
  name: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

// creat model
export const Facility = model<TFacility>("Facility", facilitySchema);
