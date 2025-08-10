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

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.query.id as string;

      const product = await productService.getProductById(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async getProductsInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const productIds = req.query.productIds as string[];

      const products = await productService.getProductsByIds(productIds);

      res.json({ products });
    } catch (error) {
      next(error);
    }
  },
};
