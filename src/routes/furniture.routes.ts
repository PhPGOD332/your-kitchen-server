import express from "express";
// Controllers
import FurnitureController from "../controllers/furniture.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadManyPhotos } from "../middlewares/photo.middleware";

const router = express.Router();

// Обработка запросов
router.get("/furniture", FurnitureController.getAllFurniture);
router.get("/furniture/:id", FurnitureController.getOneFurniture);
router.post(
  "/furniture",
  authMiddleware,
  uploadManyPhotos,
  FurnitureController.addFurniture,
);
router.patch(
  "/furniture/:id",
  authMiddleware,
  uploadManyPhotos,
  FurnitureController.updateFurniture,
);
router.delete(
  "/furniture/:id",
  authMiddleware,
  FurnitureController.deleteFurniture,
);

export default router;
