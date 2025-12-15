import { pool } from "../../config/db";

// create vehicle (admin only)
const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};

// get all vehicles
const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

// get single vehicle by id
const getVehicleById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  return result;
};

// updated single vehicle by id (admin ony)
const updateVehicle = async (
  id: string,
  vehicle_name: string,
  type: string,
  registration_number: number,
  daily_rent_price: number,
  availability_status: string
) => {
  const result = await pool.query(
    ` 
    UPDATE vehicles 
    SET
    vehicle_name = COALESCE($1, vehicle_name),
    type = COALESCE($2, type),
    registration_number = COALESCE($3, registration_number),
    daily_rent_price = COALESCE($4::NUMERIC, daily_rent_price),
    availability_status = COALESCE($5, availability_status),
    updated_at = NOW() WHERE id = $6 RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status;
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );

  return result;
};

// delete vehicle (admin only)
const deleteVehicle = async (id: string) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
  return result;
};

export const vehiclesService = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
