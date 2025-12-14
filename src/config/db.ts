import { Pool } from "pg";
import config from "./";

//DB
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
  // USER TABLE
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(15),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);

  // VEHICLES TABLE
  await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(10) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(50) UNIQUE NOT NULL,
        availability_status VARCHAR(10) NOT NULL CHECK (availability_status IN ('available', 'booked')),
        daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);

  // RENTALS TABLE
  await pool.query(`
        CREATE TABLE IF NOT EXISTS rentals(
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
        total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),
        status VARCHAR(10) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
};

export default initDB;
