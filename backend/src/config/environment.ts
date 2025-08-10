export const config = {
  PORT: process.env.PORT || 3001,
  DB: {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "password",
    NAME: process.env.DB_NAME || "quickbutik_db",
    PORT: parseInt(process.env.DB_PORT || "3306"),
  },
  NODE_ENV: process.env.NODE_ENV || "development",
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX: 100, // limit each IP to 100 requests per windowMs
  },
};
