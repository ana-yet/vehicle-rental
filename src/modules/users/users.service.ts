import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`
  );
  return result;
};

const updateUser = async (
  id: string,
  name: string,
  email: string,
  phone: string,
  role: string
) => {
  const result = await pool.query(
    `UPDATE users 
    SET
    name = COALESCE($1, name),
    email = COALESCE($2, email),
    phone = COALESCE($3, phone),
    role = COALESCE($4, role) WHERE id = $5
    RETURNING id, name , email, phone, role
    `,
    [name, email, phone, role, id]
  );
  return result;
};

const deleteUser = async (id: string) => {
  // if user has any booking
  const bookingCheck = await pool.query(
    `
    SELECT 1
    FROM rentals
    WHERE customer_id = $1
    LIMIT 1
    `,
    [id]
  );

  // If booking exists don't delete
  if ((bookingCheck.rowCount as number) > 0) {
    throw new Error("User has existing bookings and cannot be deleted");
  }

  // Delete user
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result;
};

export const usersService = {
  getAllUsers,
  updateUser,
  deleteUser,
};
