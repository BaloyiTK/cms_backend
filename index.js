import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import projectRouter from "./routes/projectRoute.js";
import modelRouter from "./routes/modelRoute.js";
import contentRouter from "./routes/contentRoute.js";
import apiRouter from "./routes/apiRoute.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

const uri = process.env.DATABASE_URI;
const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
    origin: true, // Set origin to true to allow all origins
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", userRouter);
app.use("/api", projectRouter);
app.use("/api", modelRouter);
app.use("/api", contentRouter);
app.use("/api", apiRouter);
app.use('/favicon.ico', express.static('/'));

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connected successfully");
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });

app.use(errorHandler);