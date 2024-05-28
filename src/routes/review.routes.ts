import express from "express";
// Controllers
import ReviewController from "../controllers/review.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadManyPhotos } from "../middlewares/photo.middleware";

const router = express.Router();

// Обработка запросов
router.get("/reviews", ReviewController.getReviews);
router.get("/reviews/:id", ReviewController.getReview);
router.post(
  "/reviews",
  authMiddleware,
  uploadManyPhotos,
  ReviewController.addReview,
);
router.patch(
  "/reviews/:id",
  authMiddleware,
  uploadManyPhotos,
  ReviewController.updateReview,
);
router.delete("/reviews/:id", authMiddleware, ReviewController.deleteReview);

export default router;
