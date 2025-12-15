import { Router } from "express";
import { usersController } from "./users.controller";
import auth from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", auth("admin"), usersController.getAllUsers);

export const usersRoutes = router;
