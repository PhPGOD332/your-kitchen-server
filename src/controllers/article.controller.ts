import type { Request, Response } from "express";
import ApiError from "../exceptions/api.error";
import { deletePhotos } from "../helpers/deletePhotos";
import ArticleService from "../services/article.service";

class ArticleController {
  async getRssArticles(request: Request, response: Response) {
    try {
      const result = await ArticleService.getRssArticles();
      response.header("Content-Type", "text/xml");
      response.send(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения rss статей");
    }
  }
  async getMainArticles(request: Request, response: Response) {
    try {
      const result = await ArticleService.getMainArticles();
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения главных статей");
    }
  }

  async getArticles(request: Request, response: Response) {
    try {
      const result = await ArticleService.getArticles();
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения статей");
    }
  }

  async getArticle(request: Request, response: Response) {
    try {
      const result = await ArticleService.getArticle(request.params.id);
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения статьи");
    }
  }

  async checkSlug(request: Request, response: Response) {
    if (!request.params.id) {
      return response.json({ valid: false });
    }
    try {
      const result = await ArticleService.checkSlug(request.params.id);
      response.json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка проверки ссылки статьи");
    }
  }

  async viewArticle(request: Request, response: Response) {
    try {
      const result = await ArticleService.viewArticle(request.params.id);
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка увеличения просмотров статьи");
    }
  }

  async addArticle(request: Request, response: Response) {
    if (!request.files || Object.keys(request.files).length === 0) {
      throw ApiError.BadRequest("Нет файлов для загрузки");
    }
    try {
      const result = await ArticleService.addArticle(
        request.body,
        request.files,
      );
      response.status(201).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка добавления статьи");
    }
  }

  async deleteArticle(request: Request, response: Response) {
    try {
      const result = await ArticleService.deleteArticle(request.params.id);
      response.status(200).json(result);

      if (result) {
        deletePhotos([result.preview]);
      }
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка удаления статьи");
    }
  }

  async updateArticle(request: Request, response: Response) {
    try {
      const result = await ArticleService.updateArticle(
        request.params.id,
        request.body,
      );
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка обновления статьи");
    }
  }
}

export default new ArticleController();
