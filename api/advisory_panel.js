var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
  database: 'cfo_singapore',
  user: 'cio_choice',
  password: '10gXWOqeaf',
  host: 'cxohonour.com',
});

 var CRUD = require('mysql-crud');
 var advisoryCRUD=CRUD(db, 'advisory_panel');
 
 exports.findadvisory = function(req, res) {

 	var id = parseInt(req.params.id);
 	console.log(id);
 	  advisoryCRUD.load({advisory_id : id}, function (err, val) {	  
 	   // res.jsonp(val);
       //  console.log(val);
 	  });
 	    
 }; 

   exports.advisory = function(req, res) {
 		 var query = "SELECT * FROM advisory_panel";
db.query(query, function(err, rows){
if (rows.length > 0) {
            for (var i=0; i<rows.length;i++) {
              var description = rows[i].advisory_description;}}
    res.jsonp(description);
console.log(description);
   });
 }; 