import express from "express";
import validateRequestBody from "../../middlewares/HOF.middlewares/validate.middleware";
import facilityControllers from "./facility.controller";
import facilityZodSchemas from "./facility.validation-schema";

// creat router
const facilityRouter = express.Router();

// add routes
facilityRouter.post(
  "/",
  validateRequestBody(facilityZodSchemas.facilityValidationSchema),
  facilityControllers.creatFacility,
);

export default facilityRouter;
