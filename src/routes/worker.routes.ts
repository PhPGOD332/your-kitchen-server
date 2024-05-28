import express from "express";
// Controllers
import WorkerController from "../controllers/worker.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadPhoto } from "../middlewares/photo.middleware";

const router = express.Router();

// Обработка запросов
router.get("/workers", WorkerController.getWorkers);
router.get("/workers/:id", WorkerController.getWorker);
router.post(
  "/workers",
  authMiddleware,
  uploadPhoto,
  WorkerController.addWorker,
);
router.patch(
  "/workers/:id",
  authMiddleware,
  uploadPhoto,
  WorkerController.updateWorker,
);
router.delete("/workers/:id", authMiddleware, WorkerController.deleteWorker);

export default router;
