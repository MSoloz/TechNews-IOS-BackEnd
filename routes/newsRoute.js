const express = require('express')

const router = express.Router();

const newsController = require('../controllers/newsController');

const news = require('../models/news')


router.post('/addnews',newsController.addnews)

 /**
  * @swagger
 * /news:
 *   description: The news managing API
 *   get:
 *     summary: Returns the list of all the news
 *     tags: [News]
*     responses:
 *       200:
 *         description: The list news
 *         content:
 *           application/json:
 *       404:
 *         description: news error
 */
router.get('/news',newsController.getNews);
router.post('/deleteNews',newsController.deleteNews)
router.post('/addComment',newsController.addComment)
router.post('/getCommentsByNews',newsController.getCommentsByNews)
router.post('/getNewsByUser',newsController.getNewsByUser)
router.post('/likeDislikeNews',newsController.likeDislikeNews)


module.exports = router;

