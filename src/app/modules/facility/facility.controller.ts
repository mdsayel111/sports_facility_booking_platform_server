import { RequestHandler } from "express";
import catchAsync from "../../middlewares/HOF.middlewares/catch-async.middleware";
import sendResponse from "../../utils/send-response";
import facilityService from "./facility.service";

// creatFacility middleware
// wrap the middleware by catchAsync for async error handleling
const creatFacility: RequestHandler = catchAsync(async (req, res) => {
  // creat facility
  const result = await facilityService.creatFacility(req.body);

  // if facility created successfully
  if (result) {
    // send response
    sendResponse(res, {
      success: true,
      message: "Facility creat successfully",
      data: result,
    });
  }
});

// facility controllers
const facilityControllers = {
  creatFacility,
};

export default facilityControllers;
