const express = require('express')

const userController = require('../controllers/userController')


const router = express.Router();




router.post('/login',userController.Login);

router.post('/register',userController.SignUp);



module.exports = router