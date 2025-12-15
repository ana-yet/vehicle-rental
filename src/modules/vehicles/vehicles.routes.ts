import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middlewares/auth.middleware";

const router = Router();

// public routes
router.get("/", vehiclesController.getVehicles);
router.get("/:vehicleId", vehiclesController.getVehicleById);

// admin routes
router.post("/", auth("admin"), vehiclesController.createVehicle);
router.put("/:vehicleId", auth("admin"), vehiclesController.updateVehicle);
router.delete("/:vehicleId", auth("admin"), vehiclesController.deleteVehicle);

export const vehiclesRoutes = router;
