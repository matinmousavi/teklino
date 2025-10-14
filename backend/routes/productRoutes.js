import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from "../controllers/productController.js";
import {
  protect,
  isSellerOrAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, isSellerOrAdmin, createProduct);
router.route("/myproducts").get(protect, getMyProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, isSellerOrAdmin, updateProduct)
  .delete(protect, isSellerOrAdmin, deleteProduct);

export default router;
