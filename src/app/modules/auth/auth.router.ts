import express from "express";
import validateRequestBody from "../../middlewares/HOF.middlewares/validate.middleware";
import authControllers from "./auth.controllers";
import authZodSchemas from "./auth.validation-schema";
import authorize from "../../middlewares/HOF.middlewares/authorization.middleware";

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

// create admin route
authRouter.post(
  "/create-admin",
  authorize("admin"),
  validateRequestBody(authZodSchemas.signupValidationSchema),
  authControllers.createAdmin,
);

export default authRouter;
