import { productRepository } from "../data/repositories/productRepository";
import { Product, ProductsResponse } from "../data/models/product";
import { logger } from "../utils/logger";

export const productService = {
  // Get paginated products based on original backend implementation
  async getProducts(page: number, limit: number): Promise<ProductsResponse> {
    logger.debug("Getting paginated products", { page, limit });

    const offset = (page - 1) * limit;

    const total = await productRepository.countProducts();
    const products = await productRepository.findProducts(limit, offset);

    const totalPages = Math.ceil(total / limit);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  },

  // get information on a group of products to avoid too many api calls. This is to be used for getting information in items in cart
  async getProductsByIds(ids: string[]): Promise<Product[]> {
    logger.debug("Getting products by ids", { productIds: ids });

    return await productRepository.findByIds(ids);
  },
};
