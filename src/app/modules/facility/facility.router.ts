import express from "express";
import validateRequestBody from "../../middlewares/HOF.middlewares/validate.middleware";
import facilityControllers from "./facility.controller";
import facilityZodSchemas from "./facility.validation-schema";
import authorize from "../../middlewares/HOF.middlewares/authorization.middleware";

// creat router
const facilityRouter = express.Router();

// get all facility route
facilityRouter.get("/", facilityControllers.getAllFacility);

// get latest facility route
facilityRouter.get("/latest-facility", facilityControllers.getLatestFacility);

// get single facility route
facilityRouter.get("/:id", facilityControllers.getSingleFacility);

// creat facility route
facilityRouter.post(
  "/",
  authorize("admin"),
  validateRequestBody(facilityZodSchemas.facilityValidationSchema),
  facilityControllers.creatFacility,
);

// update facility route
facilityRouter.put(
  "/:_id",
  authorize("admin"),
  validateRequestBody(facilityZodSchemas.facilityUpdateValidationSchema),
  facilityControllers.updateFacility,
);

// delete facility route
facilityRouter.delete(
  "/:_id",
  authorize("admin"),
  facilityControllers.deleteFacility,
);

export default facilityRouter;
