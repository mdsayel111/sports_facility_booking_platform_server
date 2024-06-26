import express from "express";
import authRouter from "../modules/auth/auth.router";
import facilityRouter from "../modules/facility/facility.router";
import bookingRouter from "../modules/booking/booking.router";
import checkAbilityRouter from "../modules/check-ability/check-ability.route";

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
  {
    path: "/bookings",
    router: bookingRouter,
  },
  {
    path: "/check-availability",
    router: checkAbilityRouter,
  },
];

// add all routers in router
routers.map((element) => router.use(element.path, element.router));

export default router;
