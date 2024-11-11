const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected succesfully"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server is Listening on port ${process.env.PORT}`);
});

