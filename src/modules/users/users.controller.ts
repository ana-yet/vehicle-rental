import { Request, Response } from "express";
import { usersService } from "./users.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email, phone, role } = req.body;
  try {
    const result = await usersService.updateUser(
      req.params.userId as string,
      name,
      email,
      phone,
      role
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const usersController = {
  getAllUsers,
  updateUser,
};
