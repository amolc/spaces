var connect = require('connect');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var bodyParser = require( 'body-parser' );

var cors = require('cors');
var formidable = require('formidable');
var fs = require('fs');

var space=require('./api/space.js');
//space variable contains path of space.js
var user=require('./api/user.js');


//APi

var http = require("http").createServer(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  next();
});

app.use(bodyParser.json({ limit: '50mb', extended: true, type:'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type:'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ limit: '50mb' }));


app.post('/api/space', space.createspace); 
app.get('/api/space/deletespace/:id',space.deletespace);
app.get('/api/space/findSpaceById/:id',space.findSpaceById);
app.get('/api/space/findAllSpace', space.findAllSpace);
app.get('/api/space', space.viewspace);
app.get('/api/space/deletespace', space.deletespace);
app.post('/api/space/updatespace/:id',space.updatespace);
app.get('/api/space/spacedetail/:id',space.spacedetail);


app.post('/api/createuser', user.createuser);
app.get('/api/authentication/:Username', user.authentication);



//The root folder 
var  root= connect();
root.use(serveStatic('root'));
app.use('/root', root);

app.listen(5000, function () {
  console.log('web server listening on port 5000')
})


console.log("http://localhost:5000/");


