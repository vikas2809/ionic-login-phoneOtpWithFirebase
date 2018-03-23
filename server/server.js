//creating the entry point of the server
var express = require('express');
var body_parser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors=require('cors');
var jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/mobileOtpDemo');

var app=module.exports=express();

app.set('env',process.env.NODE_ENV || 'production');

app.use(body_parser.urlencoded({limit: '50mb', extended:true}));

app.use(body_parser.json({limit: '50mb'}));

app.use(cors());

// app.use(express.static(__dirname + '/userImages'));


routes=require('./routes/routes');
app.use('/api',routes);

var port = process.env.PORT || 7500;

//starting the server
app.listen(port);

console.log('Server starts on port '+port);