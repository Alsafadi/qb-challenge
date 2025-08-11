import { Router } from "express";
import { productController } from "../controllers/productController";
import {
  validatePaginationParams,
  validateProductIds,
} from "../validators/productValidators";

export const productRoutes = Router();

productRoutes.get(
  "/products",
  validatePaginationParams,
  productController.getProducts
);

productRoutes.get(
  "/productinfo",
  validateProductIds,
  productController.getProductsInfo
);
