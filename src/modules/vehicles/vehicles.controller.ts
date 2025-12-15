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

const getVehicleById = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getVehicleById(
      req.params.vehicleId as string
    );

    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
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

// update single vehicle (admin only)
const updateVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  try {
    const result = await vehiclesService.updateVehicle(
      req.params.vehicleId as string,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    );

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.deleteVehicle(
      req.params.vehicleId as string
    );

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
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
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
