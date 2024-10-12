const express = require('express');
const router = express.Router();
const { getModerationQueue } = require('../controllers/moderationController');

router.get('/moderation-queue', getModerationQueue);

module.exports = router;
