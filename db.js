var  mongoose = require('mongoose');
var express = require('express')
/*
mongoose.connect("mongodb+srv://Atef:0000@cluster0.s7zqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{

    useNewUrlParser: true,
    useUnifiedTopology: true,

});*/

//mongodb+srv://atef:1234@cluster0.fi5io.mongodb.net/newAppDb?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://atef:1234@cluster0.fi5io.mongodb.net/newAppDb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true},(err) => {
  
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

const con = mongoose.connection

con.on('open',function(){

    console.log('connected ...')
    
})

