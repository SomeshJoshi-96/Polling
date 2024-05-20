// Importing all the necessary libraries
import express from "express";
import dotenv from "dotenv";
import { questionRouter } from "./src/features/question/question.routes.js";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import { optionRouter } from "./src/features/option/option.routes.js";
dotenv.config();

//definining app/server
export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/questions", questionRouter);
app.use("/options", optionRouter);

app.use(appLevelErrorHandlerMiddleware);
