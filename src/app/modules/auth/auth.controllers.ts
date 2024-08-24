import { RequestHandler } from "express";
import catchAsync from "../../middlewares/HOF.middlewares/catch-async.middleware";
import sendResponse from "../../utils/send-response";
import authService from "./auth.service";
import creatToken from "../../../lib/jwt/creat-token";

// signup middleware
// wrap the middleware by catch async for async error handleling
const signupUser: RequestHandler = catchAsync(async (req, res) => {
  // creat user
  const userInfo = await authService.creatUser(req.body);

  // send response
  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    data: userInfo,
  });
});

// login moddleware
// wrap the middleware by catch async for async error handleling
const login: RequestHandler = catchAsync(async (req, res) => {
  // creat user
  const userInfo = await authService.login(req.body);

  // creat jwtPayload for creat token
  const jwtPayload = { email: userInfo.email, role: userInfo.role };

  // creat jwt token
  const token = creatToken(jwtPayload);

  // send response
  sendResponse(res, {
    success: true,
    message: "User logged in successfully",
    token: token,
    data: userInfo,
  });
});

// create admin middleware
// wrap the middleware by catch async for async error handleling
const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  // creat user
  const adminInfo = await authService.createAdmin(req.body);

  // send response
  sendResponse(res, {
    success: true,
    message: "Admin registered successfully",
    data: adminInfo,
  });
});

// auth controllers
const authControllers = {
  signupUser,
  login,
  createAdmin,
};

export default authControllers;
