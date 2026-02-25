import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./error-handler.js";

const JWT_SECRET =
  process.env.JWT_SECRET || "habibi-stream-dev-secret-key-2025";

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: "user" | "creator" | "moderator" | "admin";
}

export function authenticate(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return next(new ApiError("Authentication required", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };
    req.userId = decoded.userId;
    req.userRole = decoded.role as AuthRequest["userRole"];
    next();
  } catch {
    next(new ApiError("Invalid or expired token", 401));
  }
}

export function requireAdmin(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) {
  if (req.userRole !== "admin") {
    return next(new ApiError("Admin access required", 403));
  }
  next();
}

export function generateToken(userId: string, role: string = "user"): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
}
