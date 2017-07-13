
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
  database: 'cowork',
  user: 'cio_choice',
  password: '10gXWOqeaf',
  host: 'cxohonour.com',
});

var CRUD = require('mysql-crud');
var BookingCRUD = CRUD(db,'Booking');


exports.create = function(req,res) {

    var SpaceId = req.body.SpaceId;
    var ContactName = req.body.ContactName;
    var ContactEmail = req.body.ContactEmail;
    var ContactNumber = req.body.ContactNumber; 
  
      console.log(SpaceId);
      console.log( req.body.ContactName);

 BookingCRUD.create({'SpaceId':SpaceId,'ContactName':ContactName,'ContactEmail':ContactEmail,'ContactNumber':ContactNumber},
    function (err, vals) {
      if (!err) {
        var resdata = {
          status: true,
          message: 'user answer successfully added'
        };
        //res.jsonp(resdata);
      } else {
        var resdata = {
          status: false,
          message: 'record not added '
        };
        //res.jsonp(resdata);
      }

    });
}