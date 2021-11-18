
const mongoose = require('mongoose')
const user = require('../models/user')


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


  const query = {

      email :  req.body.email,
     password : req.body.password
  
  }

  try {
  
  a = await   user.findOne(query)

   await  user.remove(a);

  }
  catch{

  console.log(error);

  }



}



module.exports = {

    SignUp,Login,DeleteUser

}