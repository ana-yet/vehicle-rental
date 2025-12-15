import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// public routes
router.get("/", vehiclesController.getVehicles);
router.get("/:vehicleId", vehiclesController.getVehicleById);

// admin routes
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
router.delete(
  "/:vehicleId",
  authMiddleware.adminMiddleware,
  vehiclesController.deleteVehicle
);

export const vehiclesRoutes = router;
