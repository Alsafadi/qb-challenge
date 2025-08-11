import { Request, Response, NextFunction } from "express";
import { productService } from "../../services/productService";

export const productController = {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await productService.getProducts(page, limit);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getProductsInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = req.query.ids;
      if (!ids || typeof ids !== "string") {
        res
          .status(400)
          .json({ error: "Missing or invalid 'ids' query parameter" });
        return;
      }
      const splitIds = ids.split(",").filter((id) => id.trim() !== "");
      const productIds = splitIds as string[];
      const products = await productService.getProductsByIds(productIds);

      res.json({ products });
    } catch (error) {
      next(error);
    }
  },

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await productService.getCategories();
      res.json({ categories });
    } catch (error) {
      next(error);
    }
  },
};
