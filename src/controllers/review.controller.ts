import type { Request, Response } from "express";
import ApiError from "../exceptions/api.error";
import { deletePhotos } from "../helpers/deletePhotos";
import reviewService from "../services/review.service";

class ReviewController {
  async getReviews(request: Request, response: Response) {
    try {
      const reviews = await reviewService.getReviews();
      response.status(200).json(reviews);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения отзывов");
    }
  }

  async getReview(request: Request, response: Response) {
    try {
      const review = await reviewService.getReview(request.params.id);
      response.status(200).json(review);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения отзыва");
    }
  }

  async addReview(request: Request, response: Response) {
    if (!request.files || Object.keys(request.files).length === 0) {
      throw ApiError.BadRequest("Нет файлов для загрузки");
    }
    try {
      const review = await reviewService.addReview(request.body, request.files);
      response.status(201).json(review);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка добавления отзыва");
    }
  }

  async deleteReview(request: Request, response: Response) {
    try {
      const review = await reviewService.deleteReview(request.params.id);
      response.status(200).json(review);

      if (review) {
        deletePhotos(review.photos);
      }
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка удаления отзыва");
    }
  }

  async updateReview(request: Request, response: Response) {
    try {
      const review = await reviewService.updateReview(
        request.params.id,
        request.body,
      );
      response.status(200).json(review);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка обновления отзыва");
    }
  }
}

export default new ReviewController();
