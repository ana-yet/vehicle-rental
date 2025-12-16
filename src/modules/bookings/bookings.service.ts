import { pool } from "../../config/db";

const createBooking = async (
  customer_id: number,
  vehicle_id: number,
  rent_start_date: string,
  rent_end_date: string
) => {
  // check overlap
  const bookedCheck = await pool.query(
    `
    SELECT 1 FROM rentals
    WHERE vehicle_id = $1
      AND status = 'active'
      AND rent_start_date <= $3
      AND rent_end_date >= $2
    `,
    [vehicle_id, rent_start_date, rent_end_date]
  );

  if ((bookedCheck.rowCount as number) > 0) {
    throw new Error("Vehicle already booked");
  }

  // get vehicle info
  const vehicleResult = await pool.query(
    `
    SELECT vehicle_name, daily_rent_price
    FROM vehicles
    WHERE id = $1
      AND availability_status = 'available'
    `,
    [vehicle_id]
  );

  if (vehicleResult.rowCount === 0) {
    throw new Error("Vehicle not available");
  }

  const { vehicle_name, daily_rent_price } = vehicleResult.rows[0];

  // calculate price
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const days =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const total_price = daily_rent_price * days;

  // insert rental
  const rentalResult = await pool.query(
    `
    INSERT INTO rentals (
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status
    )
    VALUES ($1, $2, $3, $4, $5, 'active')
    RETURNING *
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  // update vehicle status
  await pool.query(
    `
    UPDATE vehicles
    SET availability_status = 'booked'
    WHERE id = $1
    `,
    [vehicle_id]
  );

  return {
    ...rentalResult.rows[0],
    vehicle: {
      vehicle_name,
      daily_rent_price,
    },
  };
};

export const bookingsService = {
  createBooking,
};
