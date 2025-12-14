import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  // if token is not available return
  if (!authHeader)
    res.status(401).json({ error: "Unauthorized: no token provided" });

  // bearer token
  const token = authHeader?.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token as string,
      config.jwtSecret as string
    ) as JwtPayload;

    // check is user admin
    const isAdmin = decoded.role === "admin";

    if (!isAdmin) {
      res.status(403).json({ error: "Forbidden: Admins only" });
      return;
    }

    (req as any).user = decoded;

    next();
  } catch (err: any) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export const authMiddleware = { adminMiddleware };
