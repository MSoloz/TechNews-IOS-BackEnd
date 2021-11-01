const mongoose = require('mongoose')



const newsSchema = new mongoose.Schema({



title :{

    type : String,
    
    required : true

},

mydate:{

    type : String,

    required : true
},

desc :{

    type : String,
    
    required : true

   

},

image : {

    type : String,

    required : true


}


});



module.exports = mongoose.model('news',newsSchema);