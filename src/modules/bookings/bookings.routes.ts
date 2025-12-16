import { Router } from "express";
import { bookingsController } from "./bookings.controller";
import auth from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", auth("admin", "customer"), bookingsController.createBooking);

export const bookingsRouter = router;
