import express from "express";
import validateRequestBody from "../../middlewares/HOF.middlewares/validate.middleware";
import bookingControllers from "./booking.controller";
import bookingZodSchemas from "./booking.validation-schema";

// creat router
const bookingRouter = express.Router();

// add routes
bookingRouter.post(
  "/",
  validateRequestBody(bookingZodSchemas.bookingValidationSchema),
  bookingControllers.creatBooking,
);

export default bookingRouter;
