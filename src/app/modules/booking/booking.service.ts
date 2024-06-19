import AppError from "../../custom-error/app-error";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import calculatePayableAmount from "./booking.utils";

// creat booking service
const creatBooking = async (payload: TBooking) => {
  // check if user exist or not
  const user = await User.findById(payload.user);

  // check if facility exist or not
  const facility = await Facility.findById(payload.user);

  // if user or facility not found throw AppError
  if (!user && !facility) {
    throw new AppError(401, "User or facility not found !");
  }

  // get payableAmount
  const payableAmount = calculatePayableAmount(
    payload.startTime,
    payload.endTime,
    facility?.pricePerHour as number,
  );

  // set payableAmount in data
  payload.payableAmount = payableAmount;

  // creat booking
  const booking = await Booking.create(payload);
  return booking;
};

// booking services
const bookingService = {
  creatBooking,
};

export default bookingService;
