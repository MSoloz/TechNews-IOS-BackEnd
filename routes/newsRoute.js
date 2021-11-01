const express = require('express')


const router = express.Router();

const newsController = require('../controllers/newsController');

const upload = require('../middleware/storage');

const news = require('../models/newsSchema')

const multer = require('multer')



router.post('/addnews',upload.single('image'),async(req,res)=>{

    console.log(req.file);

    console.log(req.body);


    var news1 = new news({
 
         title : req.body.title,
         mydate: req.body.mydate,
         desc: req.body.desc,
         image : req.file.filename
        
    });

 try {

   await  news1.save();

  res.status(201).json({message :"true"});

     
 } catch (error) {

    console.log(error)
     
 }



});



module.exports = router;

