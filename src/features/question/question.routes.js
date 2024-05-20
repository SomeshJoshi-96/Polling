//importing necessary libraries
import express from "express";
import QuestionController from "./question.controller.js";

//creating new question route object
export const questionRouter = new express.Router();

//creating new question contoller object
const questionController = new QuestionController();

//All paths to question

questionRouter.post("/create", (req, res, next) => {
  questionController.createQuestion(req, res, next);
});

questionRouter.put("/:id/options/create", (req, res, next) => {
  console.log(req.params.id);
  questionController.addOptions(req, res, next);
});

questionRouter.delete("/:id/delete", (req, res, next) => {
  questionController.deleteQuestion(req, res, next);
});

questionRouter.get("/:id", (req, res, next) => {
  questionController.viewQuestion(req, res, next);
});
