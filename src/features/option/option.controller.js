//importing necessary libraries and constants
import OptionRepository from "../option/option.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

//Creating new instance of Option repository class
const optionRepository = new OptionRepository();

//Creating class for a Question
export default class OptionController {
  async deleteOption(req, res, next) {
    try {
      const resp = await optionRepository.deleteOption(req.params.id);
      if (resp.success) {
        console.log("success");
        res.status(201).json({
          success: true,
          msg: "Option deleted successfully",
          option: resp.option,
          question: resp.question,
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

  async addVote(req, res, next) {
    try {
      const resp = await optionRepository.addVote(req.params.id);
      if (resp.success) {
        console.log("success");
        res.status(201).json({
          success: true,
          msg: "Votes updated successfully",
          option: resp.option,
          question: resp.question,
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
