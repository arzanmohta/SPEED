const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  journal: { type: String },
  conference: { type: String },
  status: { type: String, default: 'pending' },  // 'pending', 'approved', 'rejected'
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
