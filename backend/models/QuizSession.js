import mongoose from 'mongoose';
 
const quizSessionSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
   
});
const QuizSession = mongoose.model('QuizSession',quizSessionSchema);
export default QuizSession;