import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../utils/errorHandler";

export const validatePaginationParams = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);

  if ((req.query.page && isNaN(page)) || page <= 0) {
    return next(new BadRequestError("Page must be a positive number"));
  }

  if ((req.query.limit && isNaN(limit)) || limit <= 0) {
    return next(new BadRequestError("Limit must be a positive number"));
  }

  // Set defaults or use validated values
  req.query.page = page ? page.toString() : "1";
  req.query.limit = limit ? limit.toString() : "10";

  next();
};

export const validateProductId = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const id = req.query.id as string;

  if (!id || typeof id !== "string" || id.trim() === "") {
    return next(new BadRequestError("Product ID is required"));
  }

  next();
};

export const validateProductIds = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const idsParam = req.query.ids as string;

  if (!idsParam || typeof idsParam !== "string") {
    return next(new BadRequestError("Product IDs are required"));
  }

  const ids = idsParam.split(",").filter((id) => id.trim() !== "");

  if (ids.length === 0) {
    return next(
      new BadRequestError("At least one valid product ID is required")
    );
  }

  req.query.productIds = ids;

  next();
};
