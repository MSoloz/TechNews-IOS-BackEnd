
const mongoose = require('mongoose');
const event = require('../models/event').event
const interest = require('../models/event').interest
const participation = require('../models/event').participation
const formidable = require('formidable')
const folderPath = require('../utils/folderPathManager')

var path = require('path')
const fs = require("fs")

const getEvents = async(req,res)=>{

  event.find().populate('creator').populate('Interests.user').populate('participants.user').then(resArr=>{

    res.status(200).send(resArr);

  }).catch(err=>{

    console.log(err)
    res.status(404).end();

  })

  }

const deleteEvent = async(req,res)=>{

  event.deleteOne({_id:req.body.idevent}).then(result=>{

    res.status(200).end();

  }).catch(err=>{

    res.status(404).end();

  })

}

const addEvent = async(req,res)=>{

  var form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {

    let name = fields.name
    let event_time = fields.event_time
    let description = fields.description
    let location = fields.location
    let lat = fields.lat
    let lng = fields.lng
    let adress = fields.adress

    let iduser = fields.iduser

    let eventImg = files.file

    let eventFileName

    if (eventImg) {
      eventFileName = Date.now() + path.extname(eventImg.originalFilename);
    } else {
      eventFileName = ""
    }

    const eventModel = new event({

      name: name,
      event_time: event_time,
      location: location,
      description:description,
      image:eventFileName,
      creator:iduser,
      adress:adress,
      lat:lat,
      lng:lng
      
    });

    try {

      eventModel.save().then(result => {

        if(eventImg){
          
          let rawDataImage = fs.readFileSync(eventImg.filepath)
          let filePathImage = folderPath.getFolderImagesPath("EventImg") + eventFileName
    
          fs.writeFile(filePathImage, rawDataImage, function (err) {
            
          if (err) {
    
              console.log(err)
              res.status(400).end()

          } else {

              res.status(201).end();
          }

          })
    
        }else{

          res.status(404).end()

        }


      });

    } catch (error) {

      console.log(error)
      res.status(404).end();

    }

  })

}

const getEventByUser = async(req,res)=>{

  event.find({creator:req.body.iduser}).then(eventRes=>{

    res.status(200).send(eventRes);

  }).catch(err=>{

    res.status(404).end();

  })

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

const InterestEvent = async(req,res)=>{

  event.findOne({_id:req.body.idevent}).then(eventRes=>{

    let interestObj = new interest({
      user:req.body.iduser,
    })
   
    if (eventRes.Interests.find(l=>{return l.user  == req.body.iduser}))
    {
      
      eventRes.Interests = eventRes.Interests.filter(l =>!eventRes.Interests.find(l=>{return l.user  == req.body.iduser}))
      eventRes.save()
      res.status(203).send(eventRes);

    }else{

      eventRes.Interests.push(interestObj)
      eventRes.save()
      res.status(202).send(eventRes);

    }

  }).catch(err=>{
    console.log(err)

    res.status(404).end();

  })

} 

const participateEvent = async(req,res)=>{

  event.findOne({_id:req.body.idevent}).then(eventRes=>{

    let participationObj = new participation({
      user:req.body.iduser,
    })
   
    if (eventRes.participants.find(l=>{return l.user  == req.body.iduser}))
    {
      
      eventRes.participants = eventRes.participants.filter(l =>!eventRes.participants.find(l=>{return l.user  == req.body.iduser}))
      eventRes.save()
      res.status(203).send(eventRes);

    }else{

      eventRes.participants.push(participationObj)
      eventRes.save()
      res.status(202).send(eventRes);

    }

  }).catch(err=>{
    console.log(err)

    res.status(404).end();

  })

} 

module.exports = {

  addEvent,getEvents,deleteEvent,updateEvent,getEventByUser,InterestEvent,participateEvent

}