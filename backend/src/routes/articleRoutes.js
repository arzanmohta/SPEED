const express = require('express');
const router = express.Router();
const { submitArticle, approveArticle, rejectArticle } = require('../controllers/articleController');

router.post('/articles', submitArticle);
router.post('/articles/:id/approve', approveArticle);
router.post('/articles/:id/reject', rejectArticle);

module.exports = router;
