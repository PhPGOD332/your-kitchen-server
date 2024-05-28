import type { IApiError } from "../types/IApiError";

export default class ApiError extends Error implements IApiError {
  status;
  errors;

  constructor(status: number, message: string, errors: any[] = []){
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError () {
    return new ApiError(401,'Пользователь не авторизован');
  };

  static BadRequest (message: string, errors: any[] = []) {
    console.log(message);
    return new ApiError(400,message, errors);
  }

  static InternalServerError (message: string, errors: any[] = []) {
    console.log(message);
    return new ApiError(500, message, errors);
  }

}