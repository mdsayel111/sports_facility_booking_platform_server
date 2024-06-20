import express from "express";
import authorize from "../../middlewares/HOF.middlewares/authorization.middleware";
import checkAbilityControllers from "./check-ability.controller";

// creat router
const checkAbilityRouter = express.Router();

// check-ability route
checkAbilityRouter.get(
    "/",
    authorize("user"),
    checkAbilityControllers.checkAbility,
);

export default checkAbilityRouter;
