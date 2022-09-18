const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    
    prenom: {

        type: String,
    },
    nom: {

        type: String,
    },
    email: {

        type: String,
    },

    password: {

        type: String,
    },

    image: {

        type: String,
    }


});

module.exports = mongoose.model('user', userSchema);
