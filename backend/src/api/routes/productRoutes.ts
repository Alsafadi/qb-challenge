import { Router } from "express";
import { productController } from "../controllers/productController";
import {
  validatePaginationParams,
  validateProductId,
  validateProductIds,
} from "../validators/productValidators";

export const productRoutes = Router();

productRoutes.get(
  "/products",
  validatePaginationParams,
  productController.getProducts
);
productRoutes.get("/product", validateProductId, productController.getProduct);
productRoutes.get(
  "/productinfo",
  validateProductIds,
  productController.getProductsInfo
);
