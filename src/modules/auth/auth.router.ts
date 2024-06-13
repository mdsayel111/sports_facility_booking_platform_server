import express from "express";
import validateRequestBody from "../../middlewares/HOF.middlewares/validate.middleware";
import authControllers from "./auth.controllers";
import userZodSchemas from "./auth.validation-schema";

// creat router
const authRouter = express.Router();

// add routes
authRouter.post(
  "/signup",
  validateRequestBody(userZodSchemas.userValidationSchema),
  authControllers.registerUser,
);

export default authRouter;
