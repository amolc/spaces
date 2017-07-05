
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
  database: 'cowork',
  user: 'cio_choice',
  password: 'cxohonour.com',
  host: '',
});

var CRUD = require('mysql-crud');
var UserCRUD = CRUD(db, 'User');



exports.createuser = function (req, res) {

  var Username = req.body.Username;
  var Companyname = req.body.Companyname;
  var Email = req.body.Email;
  var Password = req.body.Password;
  var Phonenumber = req.body.Phonenumber;
  console.log(Username);
  console.log(Companyname)
  console.log(req.body.Email);
  console.log(req.body.Password);
  UserCRUD.create({ 'Username': Username,'Companyname': Companyname ,'Email': Email, 'Password': Password ,'Phonenumber': Phonenumber},
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



exports.authentication = function (req, res) {
  var Email = req.params.Email;
  console.log(Email);
  var query = "select Password from User where `Email` ='" + Email + "'";
db.query(query, function (err, rows){
console.log(rows);
    for(var i=0; i<rows.length; i++){

      res.jsonp(rows[i].Password);
     
    }
  })
}

 

exports.allusers = function(req, res) {
	var query = "SELECT * from User";
		db.query(query, function(err, rows){
	res.jsonp(rows);
	});
};




