import { Types } from "mongoose";

// creat facility type
export type TFacility = {
  _id: Types.ObjectId;
  name: string;
  img: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
};
