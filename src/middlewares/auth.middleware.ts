import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    // if token is not provided return
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader?.split(" ")[1];

    try {
      // decode the token
      const decoded = jwt.verify(
        token as string,
        config.jwtSecret as string
      ) as JwtPayload;

      (req as any).user = decoded;

      // verify role
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          error: "Valid token but insufficient permissions",
        });
      }

      next();
    } catch (err: any) {
      res.status(401).json({
        error: "Missing or invalid authentication token",
      });
    }
  };
};

export default auth;
