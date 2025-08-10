import { Router } from "express";
import { productRoutes } from "./productRoutes";
import { healthRoutes } from "./healthRoutes";

export const routes = Router();

routes.use("/", healthRoutes);
routes.use("/", productRoutes);
