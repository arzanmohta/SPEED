const Article = require('../models/articleModel');
const { sendNotification } = require('../utils/emailNotification');

// Submit an article for moderation
const submitArticle = async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    sendNotification('moderator@serc.com', newArticle.title);
    res.status(201).json({ message: 'Article submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit article' });
  }
};

// Approve an article
const approveArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, { status: 'approved' });
    if (article) {
      res.status(200).json({ message: 'Article approved' });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to approve article' });
  }
};

// Reject an article
const rejectArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    if (article) {
      res.status(200).json({ message: 'Article rejected' });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to reject article' });
  }
};

module.exports = { submitArticle, approveArticle, rejectArticle };
