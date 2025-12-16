import { Request, Response } from "express";
import { bookingsService } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;
  try {
    const result = await bookingsService.createBooking(
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date
    );

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingsController = {
  createBooking,
};
