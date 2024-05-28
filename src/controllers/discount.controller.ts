import type { Request, Response } from "express";
import ApiError from "../exceptions/api.error";
import { deletePhotos } from "../helpers/deletePhotos";
import DiscountService from "../services/discount.service";

class DiscountController {
  async getDiscounts(request: Request, response: Response) {
    try {
      const result = await DiscountService.getDiscounts();
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения акций");
    }
  }

  async getDiscount(request: Request, response: Response) {
    try {
      const result = await DiscountService.getDiscount(request.params.id);
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения акции");
    }
  }

  async addDiscount(request: Request, response: Response) {
    if (!request.file) {
      throw ApiError.BadRequest("Нет файла для загрузки");
    }

    try {
      const result = await DiscountService.addDiscount(
        request.body,
        request.file,
      );
      response.status(201).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка добавления акции");
    }
  }

  async deleteDiscount(request: Request, response: Response) {
    try {
      const result = await DiscountService.deleteDiscount(request.params.id);
      response.status(200).json(result);

      if (result) {
        deletePhotos([result.image]);
      }
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка удаления акции");
    }
  }

  async updateDiscount(request: Request, response: Response) {
    try {
      const result = await DiscountService.updateDiscount(
        request.params.id,
        request.body,
        request.file,
      );
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка обновления акции");
    }
  }
}

export default new DiscountController();
