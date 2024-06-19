import express from "express";
import validateRequestBody from "../../middlewares/HOF.middlewares/validate.middleware";
import authControllers from "./auth.controllers";
import authZodSchemas from "./auth.validation-schema";

// creat router
const authRouter = express.Router();

// signup route
authRouter.post(
  "/signup",
  validateRequestBody(authZodSchemas.signupValidationSchema),
  authControllers.signupUser,
);

// login route
authRouter.post(
  "/login",
  validateRequestBody(authZodSchemas.loginValidationSchema),
  authControllers.login,
);

export default authRouter;
