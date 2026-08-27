import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
    username: {
  type: String,
  required: true
},
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizSession"
  },

  topic: {
    type: String,
    required: true
  },

  score: {
    type: Number,
    required: true
  },

  totalQuestions: {
    type: Number,
    required: true
  },

  percentage: {
    type: Number,
    required: true
  },

  tabSwitches: {
    type: Number,
    default: 0
  },

  completedAt: {
    type: Date,
    default: Date.now
  }
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);
export default QuizResult;