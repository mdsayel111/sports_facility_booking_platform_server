import { RequestHandler } from "express";
import authService from "./auth.service";
import sendResponse from "../../utils/send-response";
import catchAsync from "../../middlewares/HOF.middlewares/catch-async.middleware";

// wrap the middleware by catch async for error async error handle
const registerUser: RequestHandler = catchAsync(async (req, res) => {
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
  registerUser,
};

export default authControllers;
