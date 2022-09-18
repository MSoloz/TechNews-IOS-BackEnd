const express = require('express')


const router = express.Router();
const eventController = require('../controllers/eventController');
const event = require('../models/event')

router.post('/addevent',eventController.addEvent);

 /**
  * @swagger
 * /events:
 *   description: The events managing API
 *   get:
 *     summary: Returns the list of all the events
 *     tags: [Events]
*     responses:
 *       200:
 *         description: The list events
 *         content:
 *           application/json:
 *       404:
 *         description: news error
 */
router.get('/events',eventController.getEvents);
router.post('/deleteEvent',eventController.deleteEvent);
router.post('/getEventByUser',eventController.getEventByUser);
router.post('/InterestEvent',eventController.InterestEvent);
router.post('/participateEvent',eventController.participateEvent);

module.exports = router;
