import type { Request, Response } from "express";
import ApiError from "../exceptions/api.error";
import { deletePhotos } from "../helpers/deletePhotos";
import furnitureService from "../services/furniture.service";

class FurnitureController {
  async getAllFurniture(request: Request, response: Response) {
    try {
      const result = await furnitureService.getAllFurniture();
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения мебели");
    }
  }

  async getOneFurniture(request: Request, response: Response) {
    try {
      const result = await furnitureService.getOneFurniture(request.params.id);
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения мебели");
    }
  }

  async addFurniture(request: Request, response: Response) {
    if (!request.files || Object.keys(request.files).length === 0) {
      throw ApiError.BadRequest("Нет файлов для загрузки");
    }
    try {
      const result = await furnitureService.addFurniture(
        request.body,
        request.files,
      );
      response.status(201).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка добавления мебели");
    }
  }

  async deleteFurniture(request: Request, response: Response) {
    try {
      const result = await furnitureService.deleteFurniture(request.params.id);
      response.status(200).json(result);

      if (result) {
        deletePhotos(result.photos);
      }
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка удаления мебели");
    }
  }

  async updateFurniture(request: Request, response: Response) {
    try {
      const result = await furnitureService.updateFurniture(
        request.params.id,
        request.body,
        request.files,
      );
      response.status(200).json(result);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка обновления мебели");
    }
  }
}

export default new FurnitureController();
