import bcrypt from "bcrypt";
import { pool } from "../../config/db";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, role, email, password, phone } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, role, email, password, phone) VALUES($1, $2, $3, $4, $5) RETURNING id, name, role, email, phone, created_at, updated_at`,
    [name, role, email, hashedPass, phone]
  );

  return result;
};

export const userServices = {
  createUser,
};
