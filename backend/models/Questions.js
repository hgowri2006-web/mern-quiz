 import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 500
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (options) {
        return options.length === 4 &&
               options.every(option => option.trim().length > 0);
      },
      message: "A question must have exactly 4 non-empty options"
    }
  },

  answer: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true,
    trim: true,
    enum: ["Astronomy", "Aptitude", "Programming"]
  },

  difficulty: {
    type: String,
    trim: true
  }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;