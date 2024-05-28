import type { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api.error";

const days30 = 30 * 24 * 60 * 60 * 1000;

const CLIENT_URL: string = process.env.CLIENT_URL || '';

if(!CLIENT_URL) {
  throw new Error('CLIENT_URL is not imported from .env');
}

class UserController {
    async registration (request: Request, response: Response, next: NextFunction) {
       try {
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
          return next(ApiError.BadRequest('Validation error', errors.array()));
        }

        const { email, password, role } = request.body;
        const userData = await userService.registration(email, password, role);
        
        response.cookie('refreshToken', userData.refreshToken, {
          maxAge: days30,
          httpOnly: true,
        });

        return response.json(userData);
       } catch (error) {
        next(error);
       }
    };

    async login (request: Request, response: Response, next: NextFunction) {
        try {
          const { email, password } = request.body;
          const userData = await userService.login(email, password);

          response.cookie('refreshToken', userData.refreshToken, {
            maxAge: days30,
            httpOnly: true,
          });

          return response.json(userData);
        } catch (error) {
          next(error);
        }
    };

    async logout (request: Request, response: Response, next: NextFunction) {
        try {
          const {refreshToken} = request.cookies;
          const token = await userService.logout(refreshToken);
          response.clearCookie('refreshToken');
          return response.json(token).status(200);
        } catch (error) {
          next(error);
        }
    };

    async activate (request: Request, response: Response, next: NextFunction) {
        try {
        const activationLink = request.params.link;
        await userService.activate(activationLink);
        return response.redirect(CLIENT_URL);
        
       } catch (error) {
        next(error);
       }
    };

    async refresh (request: Request, response: Response, next: NextFunction) {
        try {
          const {refreshToken} = request.cookies;
          const userData = await userService.refresh(refreshToken);

          response.cookie('refreshToken', userData.refreshToken, {
            maxAge: days30,
            httpOnly: true,
          });

          return response.json(userData);
        } catch (error) {
          next(error);
        }
    };
    async getUsers (request: Request, response: Response, next: NextFunction) {
      try {
        const users = await userService.getAllUsers();
        return response.json(users).status(200);
      } catch (error) {
        next(error);
      }
    };

    async getUser (request: Request, response: Response, next: NextFunction) {
      try {
        const users = await userService.getUser(request.params.id);
        return response.json(users).status(200);
      } catch (error) {
        next(error);
      }
    };
    async addUser (request: Request, response: Response, next: NextFunction) {
      try {
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
          return next(ApiError.BadRequest('Validation error', errors.array()));
        }

        const { email, password, role } = request.body;
        const user = await userService.addUser(email, password, role);
        return response.json(user).status(201);
      } catch (error) {
        next(error);
      }
    };

    async deleteUser (request: Request, response: Response, next: NextFunction) {
      try {
        const user = await userService.deleteUser(request.params.id);
        return response.json(user).status(200);
      } catch (error) {
        next(error);
      }
    };

    async changeUser (request: Request, response: Response, next: NextFunction) {
      try {
        const user = await userService.changeUser(request.params.id, request.body);
        return response.json(user).status(200);
      } catch (error) {
        next(error);
      }
    };


};

export default new UserController();