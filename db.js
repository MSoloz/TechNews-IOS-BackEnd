var  mongoose = require('mongoose');

var express = require('express')





mongoose.connect("mongodb://localhost/TechNewsAppDB8",{

    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const con = mongoose.connection

con.on('open',function(){

    console.log('connected ...')
    
    
    })

