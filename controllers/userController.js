const user = require('../models/user');
const formidable = require('formidable')
const folderPath = require('../utils/folderPathManager')
var path = require('path')
const fs = require("fs")


const SignUp = async (req, res) => {

  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {

    
    let nom = fields.nom
    let prenom = fields.prenom
    let email = fields.email
    let password = fields.password  
    let userimg = files.image
    let userImgFileName

    if (userimg) {
      userImgFileName = Date.now() + path.extname(userimg.originalFilename);
    } else {
      userImgFileName = ""
    }

    const newUser = new user({

      nom: nom,
      prenom: prenom,
      email: email,
      password:password,
      image:userImgFileName

    });

    try {

      user.find({ email:email}).then(u =>{


        if (u.length > 0)
        {

          res.status(402).end()

        }else{

          newUser.save().then(result => {

            if(userimg){
              
              let rawDataImage = fs.readFileSync(userimg.filepath)
              let filePathImage = folderPath.getFolderImagesPath("UserImg") + userImgFileName
              
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
  

        }
 

      })

  

    } catch (error) {

      console.log(error)
      res.status(404).end();

    }

  })

}
/*const Login = (req, res) => {

  const query = {

    email: req.body.email,
    password: req.body.password

  }

  user.findOne(query)
    .then(user => {

      if (user) {

        let result = {_id:user._id,email:user.email,nom:user.nom ?? "",prenom : user.prenom ?? "",image:user.image ?? ""}
        console.log(result)
        res.status(200).send(result);

      } else {

        res.status(402).end();

      }

    }).catch(error => {

      console.log(error)
      res.status(404).end();

    })

}*/


const DeleteUser = async (req, res) => {


  try {

    await user.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Deleted !" });
  }
  catch {

    console.log(error);

    res.status(400);

  }

}

const UpdateUser = async (req, res) => {

  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {

    let id = fields.id
    let nom = fields.nom
    let prenom = fields.prenom

    let userimg = files.image
    let userImgFileName

    if (userimg) {
      userImgFileName = Date.now() + path.extname(userimg.originalFilename);
    } else {
      userImgFileName = ""
    }

    const updatedUser = {
      prenom:prenom,
      nom: nom,
      image:userImgFileName
    }
    
    user.findOneAndUpdate({_id:id}, updatedUser).then(result=>{

      if(userimg){
              
        let rawDataImage = fs.readFileSync(userimg.filepath)
        let filePathImage = folderPath.getFolderImagesPath("UserImg") + userImgFileName
        
        fs.writeFile(filePathImage, rawDataImage, function (err) {
          
        if (err) {
  
            console.log(err)
            res.status(400).end()

        } else {

            res.status(201).end();
        }

        })
  
      }

    }).catch(error => {

      console.log(error)
      res.status(404).end();

    });


  })

}

const getUsers = async (req, res) => {

  try {


    a = await user.find();
    let users = []
    a.forEach(u=>{

      users.push({

        _id:u._id,
        prenom:u.prenom,
        nom:u.nom,
        email:u.email,
        image:u.image

      })

    }) 

    res.status(200).send(users);

  } catch (error) {
    console.log(error)
  }


}

const changerMotDePasse = async (req, res) => {


  const { email, password } = req.body;


  try {

    await user.findOneAndUpdate(

      { email: email },

      {

        $set: {

          password: password

        }

      }

    );

    res.status(200).send()


  } catch (error) {

    console.log(error)

    res.status(404)


  }

}

module.exports = {

  SignUp, DeleteUser, UpdateUser, getUsers, changerMotDePasse

}