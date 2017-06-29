 
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'cowork',
     user : 'cio_choice',
  password : '10gXWOqeaf',
    host :'cxohonour.com',
 });

 var CRUD = require('mysql-crud');
 var UserCRUD = CRUD(db, 'User');
 
 

 exports.createuser = function (req, res) {
 
  var Username = req.body.Username;
  var Email= req.body.Email;
  var Password= req.body.Password;
  console.log(Username);
  console.log(req.body.Email);
  console.log(req.body.Password);
  UserCRUD.create({'Username': Username,'Email': Email,'Password': Password}, 
  function (err, vals) {
    if (!err) {
      var resdata = {
        status: true,
        message: 'user answer successfully added' };
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

 exports.authentication = function (req, res)
 {

  var Username = req.params.Username;
  var query = "select Password from User where `Username` ='" + Username + "'";
  db.query(query, function (err, rows){
console.log(rows);
    for(var i=0; i<rows.length; i++){

      res.jsonp(rows[i].Password);
      console.log(rows);
    }
  })
}


 