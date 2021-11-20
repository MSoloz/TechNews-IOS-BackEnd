const express = require('express')


const router = express.Router();

const newsController = require('../controllers/newsController');

const upload = require('../middleware/storage');

const news = require('../models/news')

const multer = require('multer')



router.post('/addnews',upload.single('image'),async(req,res)=>{

    console.log(req.file);

    console.log(req.body);


    var news1 = new news({
 
         title : req.body.title,
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

router.get('/news',newsController.getNews);


router.delete('/removeNews/:id',newsController.deleteNews)



router.put('/updateNews/:id',upload.single('image'),async(req,res)=>{

     
   const news1 = new news({

    _id : req.params.id,

     title : req.body.title,

      desc : req.body.desc,

      image : req.file.filename
   });



  try {
     
   await news.updateOne({_id:req.params.id},news1);

   res.status(200).json({ message :"updated succesfuly"});

  } catch (error) {
     
          console.log(error);

  }


})


module.exports = router;

