const express = require('express')
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/getChatByUser',chatController.getChatByUser)

module.exports = router;
