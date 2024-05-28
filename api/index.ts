import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

// Routes
import articleRoutes from "../src/routes/article.routes";
import authRoutes from "../src/routes/auth.routes";
import claimRoutes from "../src/routes/claim.routes";
import discountRoutes from "../src/routes/discount.routes";
import furnitureRoutes from "../src/routes/furniture.routes";
import kitchenRoutes from "../src/routes/kitchen.routes";
import photoRoutes from "../src/routes/photo.routes";
import reviewRoutes from "../src/routes/review.routes";
import workerRoutes from "../src/routes/worker.routes";

// Middlewares
import path from "path";
import errorMiddleware from "../src/middlewares/error.middleware";

const app = express();

app.use("/images/", express.static(path.join(__dirname, "../images")));
app.use("/files/", express.static(path.join(__dirname, "../files")));

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE, PATCH",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  next();
});

// Routes
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use(errorMiddleware);
app.use("/api", claimRoutes);
app.use("/api", kitchenRoutes);
app.use("/api", reviewRoutes);
app.use("/api", workerRoutes);
app.use("/api", photoRoutes);
app.use("/api", articleRoutes);
app.use("/api", furnitureRoutes);
app.use("/api", discountRoutes);
app.use("/api", authRoutes);

// Импорт .env
const PORT = Number(process.env.PORT);
const DB_URL = process.env.DB_URL;

if (!PORT) {
  throw new Error("PORT is undefined");
}
if (!DB_URL) {
  throw new Error("DB_URL is undefined");
}

// Подключение к БД
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connect to MongoDB success");
  })
  .catch((error) => {
    console.log(`DB connection error: ${error}`);
  });

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT} port`);
});
app.on("error", (error) => {
  console.log(error);
});
