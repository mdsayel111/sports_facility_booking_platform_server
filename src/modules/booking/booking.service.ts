import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

// creat booking service
const creatBooking = async (payload: TBooking) => {
  // creat user
  const user = await Booking.create(payload);
  return user;
};

// booking services
const bookingService = {
  creatBooking,
};

export default bookingService;
