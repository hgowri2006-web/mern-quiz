import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: String,
    category: String,
    difficulty: String
});
const Question = mongoose.model("Question", questionSchema);
export default Question;