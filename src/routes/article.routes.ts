import express from "express";
// Controllers
import ArticleController from "../controllers/article.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadManyPhotos } from "../middlewares/photo.middleware";

const router = express.Router();

// Обработка запросов
router.get("/articles-main", ArticleController.getMainArticles);
router.get("/articles", ArticleController.getArticles);
router.get("/articles-rss", ArticleController.getRssArticles);
router.get("/articles/:id", ArticleController.getArticle);
router.get("/articles-view/:id", ArticleController.viewArticle);
router.get("/check-articles-slug/:id", ArticleController.checkSlug);
router.post(
  "/articles",
  authMiddleware,
  uploadManyPhotos,
  ArticleController.addArticle,
);
router.patch("/articles/:id", authMiddleware, ArticleController.updateArticle);
router.delete("/articles/:id", authMiddleware, ArticleController.deleteArticle);

export default router;
