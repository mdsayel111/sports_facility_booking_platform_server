import { RequestHandler } from "express";
import catchAsync from "../../middlewares/HOF.middlewares/catch-async.middleware";
import sendResponse from "../../utils/send-response";
import authService from "./auth.service";

// wrap the middleware by catch async for async error handleling
const signupUser: RequestHandler = catchAsync(async (req, res) => {
  // creat user
  const result = await authService.creatUser(req.body);

  // if user created successfully
  if (result) {
    // send response
    sendResponse(res, {
      success: true,
      message: "User registered successfully",
      data: result,
    });
  }
});

// auth controllers
const authControllers = {
  signupUser,
};

export default authControllers;
