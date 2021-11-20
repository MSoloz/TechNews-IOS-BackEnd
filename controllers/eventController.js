
const mongoose = require('mongoose');
const event = require('../models/event')



const getEvents = async(req,res)=>{



    try {
  
     a = await event.find();
  
      res.status(200).send(a);
      
    } catch (error) {
      console.log(error)
    }
  
    
  }

const deleteEvent = async(req,res)=>{

  try {

    await  event.deleteOne({_id:req.params.id});
      
    res.status(200).json({message : "Deleted !"});
   }
   catch{
 
   console.log(error);
 
   res.status(400);
 
   }
 


}

const updateEvent = async(req,res)=>{


  const event1 = new event({

      _id : req.params.id,

      name : req.body.name,

      event_time : req.body.event_time,

      location : req.body.event_time,

      image : req.file.filename


  });


  try {

   await event.updateOne({_id:req.params.id},event1);

   res.status(200).json({ message : "updated successfuly"})
  
    
  } catch (error) {
    
    console.log(error)
  }


}


module.exports = {

getEvents,deleteEvent,updateEvent
}