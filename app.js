
const express = require('express')

const mongoose = require('mongoose')

var path = require('path')

var db = require('./db')

var cors = require('cors')

const userApi = require('./routes/userRoute')

const newsApi = require('./routes/newsRoute')

const eventApi = require('./routes/eventRoute')

const chatApi = require('./routes/chatRoute')

const bodyParser = require('body-parser')


var app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());
app.use(express.static(path.join(__dirname, "/")));

app.use('/',userApi)

app.use('/',newsApi)

app.use('/',eventApi)

app.use('/',chatApi)


//************************* SWAGGER */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


 swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//************************* END SWAGGER */

module.exports = app
    
