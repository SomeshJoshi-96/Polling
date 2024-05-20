import mongoose from "mongoose";

export const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: [5, "Text must be at least 5 characters long"],
  },
  votes: {
    type: Number,
    default: 0,
  },
  link_to_vote: {
    type: String,
  },
});

optionSchema.pre("save", function (next) {
  this.link_to_vote = `http://localhost:8000/options/${this._id}/add_vote`;
  next();
});
