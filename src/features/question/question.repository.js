//Importing necessary modules and variables
import mongoose from "mongoose";
import { questionSchema } from "./question.schema.js";
import OptionRepository from "../option/option.repository.js";
//Creating new bug database based on bug schema
export const QuestionModel = mongoose.model("Question", questionSchema);

//Creating new instance of Option repository class
const optionRepository = new OptionRepository();

//Creating bug repository class
export default class QuestionRepository {
  //function to create option
  async createQuestion(data) {
    try {
      //creating new document from received data
      console.log(data);
      let newQuestion = await new QuestionModel(data);
      newQuestion = await newQuestion.save();
      const resp = {
        success: true,
        res: newQuestion,
      };
      return resp;
    } catch (err) {
      console.log(err);
      console.log(err.message);
      const resp = {
        success: false,
        error: {
          statusCode: 400,
          msg: err.message,
        },
      };
      return resp;
    }
  }

  async addOptions(id, addOptions) {
    let question = await QuestionModel.findById(id);
    if (!question) {
      console.log("No such question exists");
      const resp = {
        success: false,
        error: {
          statusCode: 400,
          msg: "No question with such id exists",
        },
      };
      return resp;
    }

    if (addOptions.length < 1) {
      const resp = {
        success: false,
        error: {
          statusCode: 400,
          msg: "Options can't be empty",
        },
      };
      return resp;
    }
    console.log(question.options);
    for (const option of addOptions) {
      const newOption = await optionRepository.createOption(option);
      if (newOption.success) {
        question.options.push(newOption.res);
      } else {
        console.log("here");
        const resp = {
          success: false,
          error: {
            statusCode: newOption.error.statusCode,
            msg: newOption.error.statusCode,
          },
        };
        return resp;
      }
    }
    question = await question.save();
    console.log(question);
    const resp = {
      success: true,
      res: question,
    };
    return resp;
  }
  catch(err) {
    console.log(err);
    console.log(err.message);
    const resp = {
      success: false,
      error: {
        statusCode: 400,
        msg: err.message,
      },
    };
    return resp;
  }

  async deleteQuestion(id) {
    try {
      const question = await QuestionModel.findByIdAndDelete(id);
      if (!question) {
        console.log("No such question exists");
        const resp = {
          success: false,
          error: {
            statusCode: 400,
            msg: "No question with such id exists",
          },
        };
        return resp;
      } else {
        for (const option of question.options){
          if(option.votes>0){
            const resp = {
              success: false,
              error: {
                statusCode: 400,
                msg: "Question has options having votes > 0",
              },
            };
            return resp;
          }
        }
        const resp = {
          success: true,
          res: question,
        };
        return resp;
      }
    } catch (err) {
      console.log(err);
      console.log(err.message);
      const resp = {
        success: false,
        error: {
          statusCode: 400,
          msg: err.message,
        },
      };
      return resp;
    }
  }

  async viewQuestion(id) {
    try {
      const question = await QuestionModel.findById(id);
      if (!question) {
        console.log("No such question exists");
        const resp = {
          success: false,
          error: {
            statusCode: 400,
            msg: "No question with such id exists",
          },
        };
        return resp;
      } else {
        const resp = {
          success: true,
          res: question,
        };
        return resp;
      }
    } catch (err) {
      console.log(err);
      console.log(err.message);
      const resp = {
        success: false,
        error: {
          statusCode: 400,
          msg: err.message,
        },
      };
      return resp;
    }
  }
}
