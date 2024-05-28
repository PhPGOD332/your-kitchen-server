import type { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api.error";


export default function (error: unknown, request: Request, response: Response, next: NextFunction) {

  if(error instanceof ApiError) {
    return response.status(error.status).json({
      message: error.message,
      errors: error.errors,
    });
  }

  return response.status(500).json({message: 'Server error. Sorry'})
}