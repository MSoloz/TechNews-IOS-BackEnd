
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







module.exports = {

getEvents
}