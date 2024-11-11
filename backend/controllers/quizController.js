const Quiz = require('../models/Quiz');
const generatePermalink = require('../utils/generatePermalink');

exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const quiz = new Quiz({
      title,
      questions,
      user: req.user.id,
      permalink: generatePermalink(),
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ permalink: req.params.permalink }).populate('user', 'email');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

