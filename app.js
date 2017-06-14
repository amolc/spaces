var connect = require('connect');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var bodyParser = require( 'body-parser' );
var nodemailer = require( 'nodemailer' );
var cors = require('cors');


var category = require('./api/category.js');
var item = require('./api/item.js');
var answer = require('./api/answer.js');
var user = require('./api/user.js');
var companyStaff = require('./api/companyStaff.js');

//API
// var order = require('./api/order');
// app.post('/api/addorder', order.addorder);
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


var advisory = require('./api/advisory_panel.js');
app.get('/api/findadvisory/:id', advisory.findadvisory);
app.get('/api/advisory', advisory.advisory);

//survey routes
app.get('/api/allcategory', category.allcategory);
app.get('/api/item/:id', item.findItem);
app.get('/api/item/itemid/:itemid', item.findpinkIdByItemid);
app.post('/api/answer', answer.createNewAnswer);
app.get('/api/answer/classify', answer.classify);


var root = connect();
root.use(serveStatic('root'));
app.use('/', root);

var singapore = connect();
singapore.use(serveStatic('singapore'));
app.use('/singapore', singapore);

var survey = connect();
survey.use(serveStatic('survey'));
app.use('/survey', survey);


app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})




console.log("Magic at 5000");
