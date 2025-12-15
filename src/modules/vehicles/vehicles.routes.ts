import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// public routes
router.get("/", vehiclesController.getVehicles);
router.get("/:vehicleId", vehiclesController.getVehicleById);

router.post(
  "/",
  authMiddleware.adminMiddleware,
  vehiclesController.createVehicle
);
router.put(
  "/:vehicleId",
  authMiddleware.adminMiddleware,
  vehiclesController.updateVehicle
);

export const vehiclesRoutes = router;
