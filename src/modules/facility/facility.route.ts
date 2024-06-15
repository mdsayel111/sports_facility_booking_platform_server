import express from "express";
import validateRequestBody from "../../middlewares/HOF.middlewares/validate.middleware";
import facilityZodSchemas from "./facility.validation-schema";
import facilityService from "./facility.service";
import facilityControllers from "./facility.controller";

// creat router
const facilityRouter = express.Router();

// add routes
facilityRouter.post(
    "/",
    validateRequestBody(facilityZodSchemas.facilityValidationSchema),
    facilityControllers.creatFacility,
);

export default facilityRouter;
