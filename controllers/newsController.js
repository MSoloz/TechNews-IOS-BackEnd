const news = require('../models/newsSchema')
const mongoose = require('mongoose')



const addnews = async(req,res)=>{

    console.log(req.file);

    console.log(req.body);


    const news1 = new news({
 
         title : req.body.name,
         date : req.body.time,
         desc: req.body.desc,
         img : req.file.filename,
        
    });

 try {

   await  news1.save();

  res.status(201).send();

     
 } catch (error) {

    console.log(error)
     
 }


}
const getnewsByName = (req,res)=>{

 name : req.query.name;


 


    news.findOne({name : req.query.name})
    .then(product =>{

      if(product){

            res.status(200).send(product);
      }

      else {

        res.status(404).send();
      }


    }).catch(error =>{


        console.log(error)
    })

}




module.exports = {

addnews,getnewsByName

}