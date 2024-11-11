const express = require('express');
const Quiz = require('../models/Quiz');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/', authMiddleware, async (req, res) => {
  const { title, questions } = req.body;

  try {
    const quiz = new Quiz({
      title,
      questions,
      user: req.user.userId,
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user.userId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
