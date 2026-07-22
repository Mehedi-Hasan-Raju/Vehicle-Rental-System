import { Router } from "express";
import auth from "../../middlewere/auth";
import { bookingControllers } from "./booking.controller";
import { vehicleControllers } from "../vehicles/vehicles.controller";

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

router.delete(
    "/:vehicleId",
    auth("admin"),
    vehicleControllers.deleteVehicle
);

export const bookingsroute = router;