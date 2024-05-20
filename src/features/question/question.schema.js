import mongoose from "mongoose";
import { optionSchema } from "../option/option.schema.js";
export const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [10, "Title must be at least 10 characters long"],
    validate: {
      validator: function (value) {
        // Custom validation to check if the title contains a question mark
        return value.includes("?");
      },
      message: (props) => `${props.path} does not contain a question mark (?)`,
    },
  },
  options: {
    type: [optionSchema],
    required: true,
    validate: {
      validator: function (value) {
        // Custom validation to check if the options array has at least 2 elements
        return value.length >= 2;
      },
      message: (props) => `${props.path} does not contain at least 2 options`,
    },
  },
});
