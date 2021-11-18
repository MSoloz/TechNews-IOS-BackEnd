const express = require('express')


const router = express.Router();

const newsController = require('../controllers/newsController');

const upload = require('../middleware/storage');

const event = require('../models/event')

const multer = require('multer')



router.post('/addevent',upload.single('image'),async(req,res)=>{

    console.log(req.file);

    console.log(req.body);


    var event1 = new event({
 
         name : req.body.name,
         event_time: req.body.event_time,
         location : req.body.location,
         image : req.file.filename
        
    });

 try {

   await  event1.save();

  res.status(201).json({message :"true"});

     
 } catch (error) {

    console.log(error)
     
 }

});

router.get('/events',newsController.getNews);

module.exports = router;
