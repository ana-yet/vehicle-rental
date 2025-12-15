import express, { Request, Response } from "express";
import initDB from "./config/db";

import { authRoutes } from "./modules/auth/auth.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { usersRoutes } from "./modules/users/users.routes";

const app = express();
// parser
app.use(express.json());

// initializing DB
initDB();

// root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello This is my server Ha Ha Ha!");
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehiclesRoutes);
app.use("/api/v1/users", usersRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
