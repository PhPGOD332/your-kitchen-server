import express from 'express';
import { body } from 'express-validator';
// Controllers
import UserController from '../controllers/user.controller';
// Validation
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

// Обработка запросов
router.post("/registration",
  body('email').isEmail(),
  body('password').isLength({min: 8, max: 32}),
  UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);
router.get("/users/:id", authMiddleware, UserController.getUser);
router.post("/users", authMiddleware, UserController.addUser);
router.delete("/users/:id", authMiddleware, UserController.deleteUser);
router.patch("/users/:id", authMiddleware, UserController.changeUser);

export default router;