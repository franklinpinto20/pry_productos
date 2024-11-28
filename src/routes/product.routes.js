import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/api/v1/products", getProducts);
router.get("/api/v1/products/:id", getProductById);
router.post("/api/v1/products", createProduct);
router.put("/api/v1/products/:id", updateProduct);
router.delete("/api/v1/products/:id", deleteProduct);

export default router;