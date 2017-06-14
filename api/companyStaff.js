
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'cfo_singapore',
     user : 'cio_choice',
	password : '10gXWOqeaf',
    host :'cxohonour.com',
 });

 var CRUD = require('mysql-crud');
 var companyStaffCRUD=CRUD(db, 'company_staff');





 exports.staffList = function(req, res){
     console.log(req.params);
     var shortName = req.params.shortName;
	 var query = "select contact_email from company_staff where `short_name`= '" + shortName +"'" ;
				console.log(query);
				db.query(query, function(err, rows){
 				
 				res.jsonp(rows);
 				console.log(rows);
 			});

 }
