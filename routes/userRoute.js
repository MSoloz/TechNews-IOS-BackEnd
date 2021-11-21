const express = require('express')

const userController = require('../controllers/userController')


const router = express.Router();




router.get('/users',userController.getUsers);

router.post('/login',userController.Login);

router.post('/register',userController.SignUp);

router.put('/updateUser/:id',userController.UpdateUser)

router.delete('/removeUser/:id',userController.DeleteUser)


module.exports = router