import mysql from "mysql2/promise";
import { config } from "./environment";
import { logger } from "../utils/logger";

// Create the connection pool with any type to bypass type checking issues
export const pool: any = mysql.createPool({
  host: config.DB.HOST,
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.NAME,
  port: config.DB.PORT,
});

export const initDatabaseConnection = async (): Promise<boolean> => {
  try {
    // Using execute method which should work at runtime
    const [rows] = await pool.execute("SELECT 1+1 AS result");
    logger.info("Database connection established successfully");
    return true;
  } catch (error) {
    logger.error("Failed to connect to database", { error });
    return false;
  }
};
