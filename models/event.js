const mongoose = require('mongoose')


const eventSchema = mongoose.Schema({

name : {
 
    type : String,

    required : true

},  

event_time :{

    type : String ,

    required : true


},

location :{

    type : String,

    required : true

},

image : {

type : String,

required : true

}


});

module.exports = mongoose.model('event',eventSchema)