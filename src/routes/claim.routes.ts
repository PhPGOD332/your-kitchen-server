import express from "express";
// Controllers
import ClaimController from "../controllers/claim.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadManyFiles } from "../middlewares/file.middleware";

const router = express.Router();

// Обработка запросов
router.post("/claims", uploadManyFiles, ClaimController.addClaim);
router.get("/claims", authMiddleware, ClaimController.getClaims);
router.get("/claims/:id", authMiddleware, ClaimController.getClaim);
router.patch("/claims/:id", authMiddleware, ClaimController.updateClaim);
router.delete("/claims/:id", authMiddleware, ClaimController.deleteClaim);

export default router;
