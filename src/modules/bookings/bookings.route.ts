import { Router } from "express";
import auth from "../../middlewere/auth";
import { bookingControllers } from "./booking.controller";

const router = Router();

// Customer & Admin
router.post(
  "/",
  auth("customer", "admin"),
  bookingControllers.createBooking
);
router.get(
  "/",
  auth("admin", "customer"),
  bookingControllers.getBookings
);

router.put(
    "/:bookingId",
    auth("admin", "customer"),
    bookingControllers.updateBooking
);

export const bookingsroute = router;