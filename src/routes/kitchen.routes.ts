import express from "express";
// Controllers
import KitchenController from "../controllers/kitchen.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadManyPhotos } from "../middlewares/photo.middleware";

const router = express.Router();

// Обработка запросов
router.get("/kitchens-main", KitchenController.getMainKitchens);
router.get("/kitchens-rss", KitchenController.getRssKitchens);
router.get("/kitchens", KitchenController.getKitchens);
router.get("/kitchens/:id", KitchenController.getKitchenById);
router.get("/kitchens-by-slug/:id", KitchenController.getKitchenBySlug);
router.get("/check-slug/:id", KitchenController.checkSlug);
router.post(
  "/kitchens",
  authMiddleware,
  uploadManyPhotos,
  KitchenController.addKitchen,
);
router.patch(
  "/kitchens/:id",
  authMiddleware,
  uploadManyPhotos,
  KitchenController.updateKitchen,
);
router.delete("/kitchens/:id", authMiddleware, KitchenController.deleteKitchen);

export default router;
