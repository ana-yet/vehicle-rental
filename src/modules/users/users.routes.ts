import { Router } from "express";
import { usersController } from "./users.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware.adminMiddleware, usersController.getAllUsers);

export const usersRoutes = router;
