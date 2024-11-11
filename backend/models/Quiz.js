const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      answers: [
        { text: String, isCorrect: Boolean }
      ],
      isMultipleChoice: { type: Boolean, default: false },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
