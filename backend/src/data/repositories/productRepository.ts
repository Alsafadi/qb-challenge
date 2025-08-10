import { pool } from "../../config/database";
import { DatabaseError } from "../../utils/errorHandler";
import { Product } from "../models/product";
import { logger } from "../../utils/logger";

export const productRepository = {
  async findProducts(limit: number, offset: number): Promise<Product[]> {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM products LIMIT ? OFFSET ?",
        [String(limit), String(offset)]
      );
      return rows as Product[];
    } catch (error) {
      logger.error("Error finding products", { error });
      throw new DatabaseError("Failed to fetch products from database");
    }
  },

  async countProducts(): Promise<number> {
    try {
      const [countResult] = await pool.execute(
        "SELECT COUNT(*) as total FROM products"
      );
      return (countResult as any)[0].total;
    } catch (error) {
      logger.error("Error counting products", { error });
      throw new DatabaseError("Failed to count products in database");
    }
  },

  async findById(id: string): Promise<Product | null> {
    try {
      const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?", [
        id,
      ]);
      const product = (rows as any)[0];
      return product || null;
    } catch (error) {
      logger.error("Error finding product by id", { error, productId: id });
      throw new DatabaseError("Failed to fetch product from database");
    }
  },

  async findByIds(ids: string[]): Promise<Product[]> {
    try {
      if (ids.length === 0) return [];

      const placeholders = ids.map(() => "?").join(",");
      const [rows] = await pool.execute(
        `SELECT * FROM products WHERE id IN (${placeholders})`,
        ids
      );
      return rows as Product[];
    } catch (error) {
      logger.error("Error finding products by ids", { error, productIds: ids });
      throw new DatabaseError("Failed to fetch products from database");
    }
  },
};
