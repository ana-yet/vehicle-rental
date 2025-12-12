import express, { Request, Response } from "express";
import initDB from "./config/db";

const app = express();
// parser
app.use(express.json());

// initializing DB
initDB();

// root route
app.get("/",  (req: Request, res: Response) => {
  res.send("Hello This is my server Ha Ha Ha!");
});



app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;