import express from "express";
// Controllers
import PhotoController from "../controllers/photo.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadManyPhotos } from "../middlewares/photo.middleware";

const router = express.Router();

// Обработка запросов
router.get("/photos", authMiddleware, PhotoController.getPhotos);
router.get("/photos/:id", authMiddleware, PhotoController.getPhoto);
router.post(
  "/photos",
  authMiddleware,
  uploadManyPhotos,
  PhotoController.addPhotos,
);
router.delete("/photos/:id", authMiddleware, PhotoController.deletePhoto);

export default router;
