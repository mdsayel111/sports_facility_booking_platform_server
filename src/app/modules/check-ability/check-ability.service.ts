/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import AppError from "../../custom-error/app-error";
import { Booking } from "../booking/booking.model";
import { User } from "../user/user.model";
import { getAvailableSlots } from "./check-ability.utils";

// checkAblility service
const checkAbility = async (email: string, date: string) => {
  // if date not added
  if (!date) {
    throw new AppError(400, "Add ability date!")
  }

  // find user from DB
  const user = await User.findOne({ email });

  // creat find obj
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findObj: Record<string, any> = {
    user: user?._id,
    date: new Date(date),
    isBooked: "confirmed",
  };

  

  // get all bokkings from DB
  const bookings = await Booking.find(findObj);

  // get available slots
  const slots = getAvailableSlots(bookings);

  return slots;
};

// checkAbility services
const checkAbilityService = {
  checkAbility,
};

export default checkAbilityService;
