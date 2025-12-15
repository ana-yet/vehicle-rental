import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service";

// get all vehicle
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getVehicles();

    res.status(200).json({
      success: true,
      message:
        result.rows.length > 0
          ? "Vehicles retrieved successfully"
          : "No vehicles found",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// create a vehicle (admin only)
const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehiclesController = {
  getVehicles,
  createVehicle,
};
