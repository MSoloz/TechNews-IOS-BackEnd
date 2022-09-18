const mongoose = require('mongoose')

const ParticipationSchema = mongoose.Schema({
    
    user: {        
        type: mongoose.Schema.Types.ObjectId, required: false, ref: "user"
    }
    
});

const InterestSchema = mongoose.Schema({
    
    user: {        
        type: mongoose.Schema.Types.ObjectId, required: false, ref: "user"
    }
    
});


const eventSchema = mongoose.Schema({

    name: {

        type: String,

    },

    event_time: {

        type: String,
    },
    description: {

        type: String,
    },

    location: {

        type: String,
    },

    image: {

        type: String,
    },

    creator: {

        type: mongoose.Schema.Types.ObjectId, required: false, ref: "user"
    },

    adress: {

        type: String,
    },
    lat: {

        type: String,
    },
    lng: {

        type: String,

    },participants: {

        type: [ParticipationSchema],
        required: false

    },Interests: {

        type: [InterestSchema],
        required: false

    }
});

module.exports = {event:mongoose.model('event', eventSchema),participation:mongoose.model('participation', ParticipationSchema),interest:mongoose.model('interest', InterestSchema)}