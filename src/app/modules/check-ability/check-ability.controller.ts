import { RequestHandler } from "express";
import catchAsync from "../../middlewares/HOF.middlewares/catch-async.middleware";
import sendResponse from "../../utils/send-response";
import checkAbilityService from "./check-ability.service";

// checkAbility middleware
// wrap the middleware by catch async for async error handleling
const checkAbility: RequestHandler = catchAsync(async (req, res) => {
  // user email
  const userEmail = req.user?.email as string;
  const date = req.query.date;

  // get all abailable slots
  const slots = await checkAbilityService.checkAbility(
    userEmail,
    date as string,
  );

  // send response
  sendResponse(res, {
    success: true,
    message: "Availability checked successfully",
    data: slots,
  });
});

// auth controllers
const checkAbilityControllers = {
  checkAbility,
};

export default checkAbilityControllers;
