import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (email: string, password: string) => {
  //get user
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  //compare the given password and db password
  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return false;
  }

  //sign the token
  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.jwtSecret as string,
    { expiresIn: "7d" }
  );

  const { password: _pw, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};

export const authServices = {
  loginUser,
};
