import { RequestHandler } from "express";
import catchAsync from "../../middlewares/HOF.middlewares/catch-async.middleware";
import sendResponse from "../../utils/send-response";
import bookingService from "./booking.service";

// getAllBookings middleware
// wrap the middleware by catchAsync for async error handleling
const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  // get all bookings
  const result = await bookingService.getAllBookings();

  // if data not found
  if (result.length === 0) {
    // send no found data response
    sendResponse(res, {
      success: false,
      status: 404,
      message: "No Data Found",
      data: result,
    });
  }

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

  // if data not found
  if (result.length === 0) {
    // send no found data response
    sendResponse(res, {
      success: false,
      status: 404,
      message: "No Data Found",
      data: result,
    });
  }

  // send response
  sendResponse(res, {
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

// getAllBookingsOfUser middleware
// wrap the middleware by catchAsync for async error handleling
const getSingleBookingsOfUser: RequestHandler = catchAsync(async (req, res) => {
  // get id from req.params
  const { id } = req.params
  // get all bookings
  const result = await bookingService.getSingleBookingsOfUser(
    req.user?.email as string,
    id
  );

  // if data not found
  if (!result) {
    // send no found data response
    sendResponse(res, {
      success: false,
      status: 404,
      message: "No Data Found",
      data: result,
    });
  }

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

// update booking middleware
// wrap the middleware by catchAsync for async error handleling
const updateBooking: RequestHandler = catchAsync(async (req, res) => {
  // get id from req.params
  const { id } = req.params

  // user email
  const email = req.user?.email as string;

  // creat booking
  const result = await bookingService.updateBooking(email, id, req.body);

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
  getSingleBookingsOfUser,
  creatBooking,
  updateBooking,
  deleteBooking,
};

export default bookingControllers;
