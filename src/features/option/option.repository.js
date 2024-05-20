//Importing necessary modules and variables
import mongoose from "mongoose";
import { optionSchema } from "./option.schema.js";
import { QuestionModel } from "../question/question.repository.js";

//Creating new bug database based on bug schema
export const OptionModel = mongoose.model("Option", optionSchema);

//Creating bug repository class
export default class OptionRepository {
  //function to create option
  async createOption(option) {
    try {
      //creating new document from received data
      console.log(option);
      let newOption = await new OptionModel({ text: option });
      newOption = await newOption.save();
      const resp = {
        success: true,
        res: newOption,
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

  async deleteOption(id) {
    try {
      const option = await OptionModel.findByIdAndDelete(id);
      if (!option) {
        console.log("No such option exists");
        const resp = {
          success: false,
          error: {
            statusCode: 400,
            msg: "No option with such id exists",
          },
        };
        return resp;
      } else {
        if(option.votes>0){
          const resp = {
            success: false,
            error: {
              statusCode: 400,
              msg: "Can not delete option with votes > 0",
            },
          };
          return resp;
        }
        var reqId = mongoose.Types.ObjectId.createFromHexString(id);
        console.log(reqId);
        let question = await QuestionModel.findOne({
          options: { $elemMatch: { _id: reqId } },
        });
        console.log(question);
        const index = question.options.findIndex(
          (option) => option._id.toString() === reqId.toString()
        );
        console.log(index, question.options[index]);
        question.options.splice(index, 1);
        question = await question.save();
        const resp = {
          success: true,
          option: option,
          question: question,
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

  async addVote(id) {
    try {
      let option = await OptionModel.findById(id);
      if (!option) {
        console.log("No such option exists");
        const resp = {
          success: false,
          error: {
            statusCode: 400,
            msg: "No option with such id exists",
          },
        };
        return resp;
      } else {
        option.votes = option.votes + 1;
        option = await option.save();
        console.log(option.votes);
        var reqId = mongoose.Types.ObjectId.createFromHexString(id);
        console.log(reqId);
        let question = await QuestionModel.findOne({
          options: { $elemMatch: { _id: reqId } },
        });
        console.log(question);
        const index = question.options.findIndex(
          (option) => option._id.toString() === reqId.toString()
        );
        console.log(index, question.options[index]);
        question.options[index].votes = question.options[index].votes + 1;
        question = await question.save();
        const resp = {
          success: true,
          option: option,
          question: question,
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
