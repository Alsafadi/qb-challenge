import { Request, Response, NextFunction } from "express";
import { initDatabaseConnection } from "../../config/database";

export const healthController = {
  async check(_req: Request, res: Response, next: NextFunction) {
    try {
      const dbStatus = await initDatabaseConnection();

      if (!dbStatus) {
        return res.status(500).json({
          status: "error",
          database: "disconnected",
          uptime: process.uptime(),
        });
      }

      res.json({
        status: "ok",
        database: "connected",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return next(error);
    }
  },
};
