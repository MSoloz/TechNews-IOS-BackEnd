const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config')
const userController = require('../controllers/userController');
const mailControler = require('../controllers/mailController')
const router = express.Router();




 /**
  * @swagger
 * /users:
 *   description: The users managing API
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
*     responses:
 *       200:
 *         description: The list news
 *         content:
 *           application/json:
 *       404:
 *         description: news error
 */
router.get('/users', userController.getUsers);

/*router.post('/login', userController.Login);*/
router.post('/SignUp', userController.SignUp);
router.post('/UpdateUser', userController.UpdateUser);


router.delete('/removeUser/:id', userController.DeleteUser)
router.post('/sendEmail', mailControler.sendEmail1)
router.put('/updatePassword', userController.changerMotDePasse)

module.exports = router