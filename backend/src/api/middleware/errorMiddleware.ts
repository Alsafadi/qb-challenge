import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/errorHandler";
import { logger } from "../../utils/logger";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log all errors
  logger.error(err.message, {
    stack: err.stack,
    name: err.name,
  });

  // Handle known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    status: "error",
    message: "An unexpected error occurred",
  });
};
