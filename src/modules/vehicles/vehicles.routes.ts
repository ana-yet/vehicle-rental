import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware.adminMiddleware,
  vehiclesController.createVehicle
);

export const vehiclesRoutes = router;
