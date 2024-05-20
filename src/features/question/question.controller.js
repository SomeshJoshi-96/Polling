//importing necessary libraries and constants
import QuestionRepository from "./question.repository.js";
import OptionRepository from "../option/option.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { QuestionModel } from "./question.repository.js";
//Creating new instance of Question repository class
const questionRepository = new QuestionRepository();

//Creating new instance of Option repository class
const optionRepository = new OptionRepository();

//Creating class for a Question
export default class QuestionController {
  //function to create a new Question
  async createQuestion(req, res, next) {
    try {
      //extracting data from req body
      const data = { ...req.body };
      if (data.options.length < 1) {
        throw new customErrorHandler(400, "Options can't be empty");
      }
      console.log(data);
      const newOptions = [];
      for (const option of data.options) {
        console.log(option);
        const newOption = await optionRepository.createOption(option);
        if (newOption.success) {
          newOptions.push(newOption.res);
        } else {
          throw new customErrorHandler(
            newOption.error.statusCode,
            newOption.error.msg
          );
        }
      }
      const resp = await questionRepository.createQuestion({
        ...req.body,
        options: newOptions,
      });
      if (resp.success) {
        console.log(resp.res);
        res.status(201).json({
          success: true,
          msg: "Question added successfully",
          res: resp.res,
        });
      } else {
        if (resp.error.msg) {
          throw new customErrorHandler(resp.error.statusCode, resp.error.msg);
        } else {
          throw new Error();
        }
      }
    } catch (err) {
      next(err);
    }
  }
  async addOptions(req, res, next) {
    try {
      const addOptions = req.body.options;
      const id = req.params.id;
      console.log(addOptions, id);
      const resp = await questionRepository.addOptions(id, addOptions);
      if (resp.success) {
        console.log("success");
        res.status(201).json({
          success: true,
          msg: "Options added successfully",
          res: resp.res,
        });
      } else {
        if (resp.error.msg) {
          throw new customErrorHandler(resp.error.statusCode, resp.error.msg);
        } else {
          throw new Error();
        }
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteQuestion(req, res, next) {
    try {
      const resp = await questionRepository.deleteQuestion(req.params.id);
      if (resp.success) {
        console.log("success");
        res.status(201).json({
          success: true,
          msg: "Question deleted successfully",
          res: resp.res,
        });
      } else {
        if (resp.error.msg) {
          throw new customErrorHandler(resp.error.statusCode, resp.error.msg);
        } else {
          throw new Error();
        }
      }
    } catch (err) {
      next(err);
    }
  }

  async viewQuestion(req, res, next) {
    try {
      const resp = await questionRepository.viewQuestion(req.params.id);
      if (resp.success) {
        console.log("success");
        res.status(201).json({
          success: true,
          msg: "Question fetched successfully",
          res: resp.res,
        });
      } else {
        if (resp.error.msg) {
          throw new customErrorHandler(resp.error.statusCode, resp.error.msg);
        } else {
          throw new Error();
        }
      }
    } catch (err) {
      next(err);
    }
  }
}
