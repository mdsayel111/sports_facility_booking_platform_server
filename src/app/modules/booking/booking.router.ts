import express from "express";
import validateRequestBody from "../../middlewares/HOF.middlewares/validate.middleware";
import bookingControllers from "./booking.controller";
import bookingZodSchemas from "./booking.validation-schema";
import authorize from "../../middlewares/HOF.middlewares/authorization.middleware";

// creat router
const bookingRouter = express.Router();

// get all booking route
bookingRouter.get("/", authorize("admin"), bookingControllers.getAllBookings);

// get all booking of user route
bookingRouter.get(
  "/user",
  authorize("user"),
  bookingControllers.getAllBookingsOfUser,
);

// creat booking route
bookingRouter.post(
  "/",
  authorize("user"),
  validateRequestBody(bookingZodSchemas.bookingValidationSchema),
  bookingControllers.creatBooking,
);

// delete booking route
bookingRouter.delete(
  "/:_id",
  authorize("user"),
  bookingControllers.deleteBooking,
);

export default bookingRouter;
