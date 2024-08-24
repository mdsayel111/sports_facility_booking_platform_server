/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint  no-unused-vars: "error" */
import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";
import mongooseValidationErrorHandler from "../error-handler/mongoose-validation-error-handler";
import zodErrorHandler from "../error-handler/zod.error-handler";
import { TErrorObj } from "../interface/error";
import mongooseDuplicateKeyErrorHandler from "../error-handler/mongoose-duplicate-key-error-handler";
import AppError from "../custom-error/app-error";
import appErrorHandler from "../error-handler/app-error-handler";
import mongooseCastErrorHandler from "../error-handler/mongoose-cast-error-handler";
import jwt from "jsonwebtoken";
import jwtErrorHandler from "../error-handler/jwt-error-handler";

// global error handle middleware
const globalErrorHandleMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // status
  let status = 500;

  // default errObj
  let errObj: TErrorObj = {
    message: "Something went wrong !",
    errorMessages: [
      {
        path: "",
        message: "Something went wrong !",
      },
    ],
    stack: "",
  };

  let newErrorObj: null | TErrorObj = null;

  // if error comes from zod validation
  if (err instanceof ZodError) {
    status = 400;

    // pass err to zodErrorHandler function
    newErrorObj = zodErrorHandler(err);
  }

  // if error comes for mongoose validation
  if (err instanceof mongoose.Error.ValidationError) {
    status = 400;

    // pass err to mongooseValidationErrorHandler
    newErrorObj = mongooseValidationErrorHandler(err);
  }

  // if error comes from mongoose cast error
  if (err instanceof mongoose.Error.CastError) {
    status = 400;

    // pass err to mongooseCastErrorHandler
    newErrorObj = mongooseCastErrorHandler(err);
  }

  // if error comes from mongoose duplicate key error
  if (err.code === 11000) {
    status = 400;

    // pass err to mongooseCastErrorHandler
    newErrorObj = mongooseDuplicateKeyErrorHandler(err);
  }

  // if error comes for jwt token expire
  if (err instanceof jwt.TokenExpiredError) {
    status = 403;

    // pass err to jwtTokenExpireErrorHandler
    newErrorObj = jwtErrorHandler(err);
  }

  // if error comes for jwt invalid token
  if (err instanceof jwt.JsonWebTokenError) {
    status = 403;

    // pass err to jwtTokenExpireErrorHandler
    newErrorObj = jwtErrorHandler(err);
  }

  // if error comes from AppError
  if (err instanceof AppError) {
    status = err.statusValue;

    // pass err to appErrorHandler
    newErrorObj = appErrorHandler(err);
  }

  // if newErrorObj is not null set errObj = newObj
  if (newErrorObj) {
    errObj = newErrorObj;
  }

  // if server run in production delete stack from errObj, so stack doesn't send with response
  if (process.env.NODE_ENV === "production") {
    delete errObj.stack;
  }

  // if status comes for authentication, then set statusCode to errObj
  if (status === 401) {
    errObj.statusCode = 401;
  }

  console.log(err);

  // send response if any error occur
  res.status(status).send({ success: false, ...errObj });
};

export default globalErrorHandleMiddleware;
