
const express = require('express')

const mongoose = require('mongoose')

var path = require('path')

var db = require('./db')

var cors = require('cors')

var BodyParser = require('body-parser')


const userApi = require('./routes/userRoute')

const newsApi = require('./routes/newsRoute')
const bodyParser = require('body-parser')


var  app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());


app.use(express.static('public'));  

app.use('/img', express.static('uploads/images'));


app.use('/',userApi)

app.use('/',newsApi)



module.exports = app
    
