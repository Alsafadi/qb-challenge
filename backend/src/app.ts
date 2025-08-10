import express from "express";

import helmet from "helmet";
import { routes } from "./api/routes";
import { errorMiddleware } from "./api/middleware/errorMiddleware";
import { apiLimiter } from "./api/middleware/rateLimiter";
import { initDatabaseConnection } from "./config/database";
import { logger } from "./utils/logger";

// Initialize express application
export const app = express();

// Initialize database connection
initDatabaseConnection()
  .then((connected) => {
    if (connected) {
      logger.info("Database connection initialized successfully");
    } else {
      logger.warn("Failed to initialize database connection");
    }
  })
  .catch((err) => {
    logger.error("Error initializing database connection", { error: err });
  });

// Security middleware
app.use(helmet());

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(apiLimiter);

// API routes
app.use(routes);

// Error handling middleware
app.use(errorMiddleware);
