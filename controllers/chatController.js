
const mongoose = require('mongoose');
const chat = require('../models/chat')

const getChatByUser = async (req, res) => {

    let id = req.body.id
    let otherid = req.body.otherid

    chat.find({ $or: [{ 'user': id, 'otherUser': otherid }, { 'user': otherid, 'otherUser': id }] }).then(
        result => {

            if (result.length > 0) {

                res.status(200).json(result[0]);

            } else {

                let id = req.body.id
                let otherid = req.body.otherid
                let channelUrl = id + "_" + otherid

                const newChat = new chat({

                    channelUrl: channelUrl,
                    user: id,
                    otherUser: otherid

                })

                newChat.save().then(result => {
                    console.log(result)
                    res.status(200).send(newChat);

                }).catch(err => {

                    res.status(404).end();

                })

            }

        }
    ).catch(err => {

        res.status(404).end();

    });
}



module.exports = {

    getChatByUser

}