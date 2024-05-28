import express from "express";
// Controllers
import DiscountController from "../controllers/discount.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadPhoto } from "../middlewares/photo.middleware";

const router = express.Router();

// Обработка запросов
router.get("/discounts", DiscountController.getDiscounts);
router.get("/discounts/:id", DiscountController.getDiscount);
router.post(
  "/discounts",
  authMiddleware,
  uploadPhoto,
  DiscountController.addDiscount,
);
router.patch(
  "/discounts/:id",
  authMiddleware,
  uploadPhoto,
  DiscountController.updateDiscount,
);
router.delete(
  "/discounts/:id",
  authMiddleware,
  DiscountController.deleteDiscount,
);

export default router;
