import { RequestHandler } from "express";
import catchAsync from "../../middlewares/HOF.middlewares/catch-async.middleware";
import sendResponse from "../../utils/send-response";
import bookingService from "./booking.service";

// getAllBookings middleware
// wrap the middleware by catchAsync for async error handleling
const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  // get all bookings
  const result = await bookingService.getAllBookings();

  // send response
  sendResponse(res, {
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

// getAllBookingsOfUser middleware
// wrap the middleware by catchAsync for async error handleling
const getAllBookingsOfUser: RequestHandler = catchAsync(async (req, res) => {
  // get all bookings
  const result = await bookingService.getAllBookingsOfUser(
    req.user?.email as string,
  );

  // send response
  sendResponse(res, {
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

// creatBooking middleware
// wrap the middleware by catchAsync for async error handleling
const creatBooking: RequestHandler = catchAsync(async (req, res) => {
  // user email
  const email = req.user?.email as string;

  // creat booking
  const result = await bookingService.creatBooking(email, req.body);

  // send response
  sendResponse(res, {
    success: true,
    message: "Booking creat successfully",
    data: result,
  });
});

// creatBooking middleware
// wrap the middleware by catchAsync for async error handleling
const deleteBooking: RequestHandler = catchAsync(async (req, res) => {
  // user email
  const { _id } = req.params;

  // creat booking
  const result = await bookingService.deleteBooking(_id);

  // send response
  sendResponse(res, {
    success: true,
    message: "Booking cancelled successfully",
    data: result,
  });
});

// booking controllers
const bookingControllers = {
  getAllBookings,
  getAllBookingsOfUser,
  creatBooking,
  deleteBooking,
};

export default bookingControllers;
