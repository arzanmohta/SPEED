const express = require('express');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/articleRoutes');
const moderationRoutes = require('./routes/moderationRoutes');

const app = express();
app.use(express.json());

app.use('/api', articleRoutes);
app.use('/api', moderationRoutes);

mongoose.connect('mongodb://localhost:27017/serc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = app;
