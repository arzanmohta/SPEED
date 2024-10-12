const Article = require('../models/articleModel');

// Get articles awaiting moderation
const getModerationQueue = async (req, res) => {
  try {
    const articles = await Article.find({ status: 'pending' });
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve moderation queue' });
  }
};

module.exports = { getModerationQueue };
