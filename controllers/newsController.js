const news = require('../models/news').news
const comment = require('../models/news').comment
const like = require('../models/news').like
const formidable = require('formidable')
const folderPath = require('../utils/folderPathManager')

var path = require('path')
const fs = require("fs")

const addnews = async (req, res) => {

  var form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {

    let title = fields.title
    let description = fields.desc
    let iduser = fields.iduser

    let newsImg = files.file

    let newsFileName

    if (newsImg) {
      newsFileName = Date.now() + path.extname(newsImg.originalFilename);
    } else {
      newsFileName = ""
    }

    const news1 = new news({

      title: title,
      desc: description,
      image: newsFileName,
      creator:iduser

    });

    try {

      news1.save().then(result => {

        if(newsImg){
          
          let rawDataImage = fs.readFileSync(newsImg.filepath)
          let filePathImage = folderPath.getFolderImagesPath("NewsImg") + newsFileName
    
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


const getnewsByName = (req, res) => {

  news.findOne({ name: req.query.name })
    .then(product => {

      if (product) {

        res.status(200).send(product);
      }

      else {

        res.status(404).send();
      }


    }).catch(error => {


      console.log(error)
    })

}

const getNews = async (req, res) => {
  
  try {

    news.find().populate('creator').populate('comments.user').populate('likes.user').then(newsArrRes => {

      res.status(200).send(newsArrRes);

    });

  } catch (error) {

    res.status(404).end();

  }

}


const deleteNews = async(req,res)=>{

  news.deleteOne({_id:req.body.idnews}).then(result=>{

    res.status(200).end();

  }).catch(err=>{

    res.status(404).end();

  })

}

const getCommentsByNews = async(req,res)=>{

  news.findOne({_id:req.body.idnews}).populate('comments.user').then(newsRes=>{

    res.status(200).send(newsRes.comments);

  }).catch(err=>{

    res.status(404).end();

  })

}

const getNewsByUser = async(req,res)=>{

  news.find().populate('creator').populate('comments.user').populate('likes.user').then(newsRes => {

    res.status(200).send(newsRes);

  }).catch(err=>{
    console.log(err)

    res.status(404).end();

  })

} 


const likeDislikeNews = async(req,res)=>{

  news.findOne({_id:req.body.idnews}).then(newsRes=>{

    let likeObj = new like({
      user:req.body.iduser,
    })
   
    if (newsRes.likes.find(l=>{return l.user  == req.body.iduser}))
    {
      
      newsRes.likes = newsRes.likes.filter(l =>!newsRes.likes.find(l=>{return l.user  == req.body.iduser}))
      newsRes.save()
      res.status(203).send(newsRes);

    }else{

      newsRes.likes.push(likeObj)
      newsRes.save()
      res.status(202).send(newsRes);

    }


  }).catch(err=>{
    console.log(err)

    res.status(404).end();

  })

} 




const addComment = async(req,res)=>{

  news.findOne({_id:req.body.idnews}).then(news=>{
    
    let cmt = new comment({

      user:req.body.iduser,
      comment:req.body.comment

    })
  
    news.comments.push(cmt)
    news.save().then(newNews=>{

      res.status(200).end();

    }).catch(errCmt =>{

      res.status(404).end();

    })

  }).catch(err=>{

    res.status(404).end();

  })

}


module.exports = {

  addnews, getnewsByName, getNews, deleteNews,addComment,getCommentsByNews,getNewsByUser,likeDislikeNews

}