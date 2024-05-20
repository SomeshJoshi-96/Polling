//importing necessary libraries
import express from "express";
import OptionController from "./option.controller.js";
//creating new option route object
export const optionRouter = new express.Router();

//creating new option contoller object
const optionController = new OptionController();

//All paths to option

optionRouter.get("/:id/add_vote", (req, res, next) => {
  optionController.addVote(req, res, next);
});

optionRouter.delete("/:id/delete",(req,res,next)=>{
  optionController.deleteOption(req,res,next);
})
