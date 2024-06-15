import express from "express";
import authRouter from "../modules/auth/auth.router";
import facilityRouter from "../modules/facility/facility.route";

// /api router
const router = express.Router();

// array of all router path and roueter
const routers = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/facility",
    router: facilityRouter,
  },
];

// add all routers in router
routers.map((element) => router.use(element.path, element.router));

export default router;
