import AppError from "../../custom-error/app-error";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { calculatePayableAmount, isTimeConflict } from "./booking.utils";

// get all bookings
const getAllBookings = async () => {
  // get all bookings from DB
  const bookings = await Booking.find({ isBooked: "confirmed" }).populate([
    "facility",
    "user",
  ]);

  return bookings;
};

// get all bookings
const getAllBookingsOfUser = async (userEmail: string) => {
  // get all bookings from DB
  const user = await User.findOne({ email: userEmail });

  const bookings = await Booking.find({ user: user?._id }).populate("facility");

  return bookings;
};

// get single bookings
const getSingleBookingsOfUser = async (userEmail: string, id: string) => {
  // get all bookings from DB
  const user = await User.findOne({ email: userEmail });

  const bookings = await Booking.findOne({ user: user?._id, _id: id }).populate("facility");

  return bookings;
};

// creat booking service
const creatBooking = async (userEmail: string, payload: TBooking) => {
  // check if user exist or not
  const user = await User.findOne({ email: userEmail });

  // check if facility exist or not
  const facility = await Facility.findById(payload.facility);

  // if user or facility not found throw AppError
  if (!user && !facility) {
    throw new AppError(401, "User or facility not found !");
  }

  if (facility?.isDeleted) {
    throw new AppError(400, "Facility has been deleted !");
  }

  // get bookings which can confict with current booking time
  const userBookingsFromDB = await Booking.find({
    date: payload.date,
    isBooked: "confirmed",
  });

  // check time conflict or not
  const timeWillConflict = isTimeConflict(userBookingsFromDB, payload);

  // if booking time is conflict with other booking
  if (timeWillConflict) {
    throw new AppError(400, "Booking time is conflict with other booking !");
  }

  // get payableAmount
  const payableAmount = calculatePayableAmount(
    payload.startTime,
    payload.endTime,
    facility?.pricePerHour as number,
  );

  // if payable amount is less then 0, means start time is getter then end time
  if (payableAmount <= 0) {
    throw new AppError(400, "Start time must be less than end time !");
  }

  // set payableAmount in data
  payload.payableAmount = Number(payableAmount.toFixed(0));

  // creat booking
  const booking = await Booking.create({ ...payload, user: user?._id });

  return booking;
};

// update booking service
const updateBooking = async (userEmail: string, id: string, payload: TBooking) => {
  // get user from DB
  const user = await User.findOne({ email: userEmail })

  // check if booking exist or not
  const isBookingexist = await Booking.findOne({ user: user?._id, _id: id });

  // if bookings not found throw AppError
  if (!isBookingexist) {
    throw new AppError(401, "Bookings not found !");
  }

  // update booking
  const booking = await Booking.findOneAndUpdate({ _id: id }, payload, { new: true });

  return booking;
};

// delete booking service
const deleteBooking = async (_id: string) => {
  // check if user exist or not
  const booking = await Booking.findByIdAndUpdate(
    _id,
    { isBooked: "canceled" },
    { new: true },
  ).populate("facility");

  return booking;
};

// booking services
const bookingService = {
  getAllBookings,
  getAllBookingsOfUser,
  getSingleBookingsOfUser,
  creatBooking,
  updateBooking,
  deleteBooking,
};

export default bookingService;
