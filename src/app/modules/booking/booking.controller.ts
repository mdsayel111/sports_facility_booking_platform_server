import { RequestHandler } from "express";
import catchAsync from "../../middlewares/HOF.middlewares/catch-async.middleware";
import sendResponse from "../../utils/send-response";
import bookingService from "./booking.service";

// creatBooking middleware
// wrap the middleware by catchAsync for async error handleling
const creatBooking: RequestHandler = catchAsync(async (req, res) => {
  // creat booking
  const result = await bookingService.creatBooking(req.body);

  // if booking created successfully
  if (result) {
    // send response
    sendResponse(res, {
      success: true,
      message: "Booking creat successfully",
      data: result,
    });
  }
});

// booking controllers
const bookingControllers = {
  creatBooking,
};

export default bookingControllers;
