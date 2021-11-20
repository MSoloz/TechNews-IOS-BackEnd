const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const user = require('../models/user');



const SignUp = async(req,res)=>{

 var  newUser = new user({

    name : req.body.name,
    email : req.body.email,
    password : req.body.password

  } );

  try {

          


       await newUser.save();

       res.status(201).send();

    
  } catch (error) {

    console.log(error);

    
  }

}
const Login = (req,res)=>{


  const query = {

      email :  req.body.email,
     password : req.body.password
  
  }

  user.findOne(query)
  .then(user =>{
  
   if(user){

     res.status(200).send();

   }else{

       res.status(404).send();


   }


  
  }).catch(error =>{

  console.log(error)

  })

}



const DeleteUser = async(req,res)=>{


  try {

   await  user.deleteOne({_id:req.params.id});
     
   res.status(200).json({message : "Deleted !"});
  }
  catch{

  console.log(error);

  res.status(400);

  }

}

const UpdateUser = async(req,res)=>{

  const user1 = new user({


    _id: req.params.id,
     name : req.body.name,
    email : req.body.email,
    password : req.body.password

  });

  try{

   await user.updateOne({_id:req.params.id},user1);

       res.status(201).json({ message :"updated successufuly"});

  }catch(error){


    console.log(error);
  
  }

}

module.exports = {

    SignUp,Login,DeleteUser,UpdateUser

}