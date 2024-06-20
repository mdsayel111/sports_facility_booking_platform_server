/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Booking } from "../booking/booking.model";
import { User } from "../user/user.model";
import { getAvailableSlots } from "./check-ability.utils";

// checkAblility service
const checkAbility = async (email: string, date?: string) => {
  // find user from DB
  const user = await User.findOne({ email });

  // creat find obj
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findObj: Record<string, any> = {
    user: user?._id,
    date: new Date(),
    isBooked: "confirmed",
  };

  if (date) {
    findObj.date = new Date(date);
  }

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
