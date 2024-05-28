import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api.error";
import tokenService from "../services/token.service";
import type { JwtPayload } from "jsonwebtoken";

// Расширение типа Request для добавления свойства user
interface CustomRequest extends Request {
  user?: JwtPayload | string; // Или замените JwtPayload на тип, представляющий данные пользователя
}

export default function(request: CustomRequest, response: Response, next: NextFunction) {
  try {
    // Чтение header authorization
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    // Проверка access токена
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    request.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
