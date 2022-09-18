const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({

    
    channelUrl: {

        type: String,
    },
    user: {

        type: String
    },
    otherUser: {

        type: String
    }


});

module.exports = mongoose.model('chat', chatSchema);
