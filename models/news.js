const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    
    user: {        
        type: mongoose.Schema.Types.ObjectId, required: false, ref: "user"
    },
    comment: {

        type: String,
    }
 
});

const likeSchema = mongoose.Schema({
    
    user: {        
        type: mongoose.Schema.Types.ObjectId, required: false, ref: "user"
    }
    
});

const newsSchema = new mongoose.Schema({

    title: {

        type: String,

        required: true
    },

    desc: {

        type: String,
    },

    image: {

        type: String,

        required: true

    },comments: {

        type: [commentSchema],
        required: false

    },likes: {

        type: [likeSchema],
        required: false
    },
    creator: {

        type: mongoose.Schema.Types.ObjectId, required: false, ref: "user"
    },

});

module.exports = {news:mongoose.model('news', newsSchema),comment:mongoose.model('comment', commentSchema),like:mongoose.model('like', likeSchema)};