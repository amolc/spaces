 
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'cowork',
     user : 'cio_choice',
  password : '10gXWOqeaf',
    host :'cxohonour.com',
 });

 var CRUD = require('mysql-crud');
 var SpaceCRUD=CRUD(db, 'Space');
 
  exports.findAllSpace = function(req, res) {
  	  SpaceCRUD.load({}, function (err, val) {	   	  	
  	  	res.jsonp(val);
  	  });  
  }; 
 



exports.findSpaceById = function(req, res) {
 
 var data = parseInt(req.params.id);
 console.log(data);


//  SpaceCRUD.load({SpaceId: data}, function (err, val) {	  
//  	res.jsonp(val);
 
   var query = "select * from Space where `SpaceId`= '"+data+"'";

   db.query(query, function(err, rows) {

   res.jsonp(rows);
  // });
 });
}

//functions to 



 
//  exports.findspace= function(req, res) {

//  	var id = parseInt(req.params.id);
//  	console.log(id);
//  	  SpaceCRUD.load({SpaceId: id}, function (err, val) {	  
//  	  	res.jsonp(val);
     
//  	  });
 	    
//  }; 
 
//  /******************for select all space*****************/

//   exports.spaceList = function(req, res) {
//  	 SpaceCRUD.load({}, function (err, val) {	  
//  	  	res.jsonp(val);
//  	  });   
//  }; 

//  exports.allspace = function(req, res) {
//   		 var query = "select * from SPACE";
//  db.query(query, function(err, rows){
//      res.jsonp(rows);
//     });
//   }; 


/******************for create new space  inster value in to data base*****************/ 
 
 exports.createspace = function(req, res) {
 	console.log(req.body);
 	 var SpaceName = req.body.SpaceName;
 	 var SpaceDescription = req.body.SpaceDescription;
     var SpaceSize = req.body.SpaceSize; 
     var Pax = req.body.Pax; 
     var SpacePricing= req.body.SpacePricing; 
     var SpaceAmenities = req.body.SpaceAmenities; 
     var Img=req.body.Img
    console.log(SpaceAmenities);
    console.log(Img);
    console.log(req.body); //showing all the spaces in the database???!?!? WHY 
 	//console.log('name ' + space_name);
 	//console.log('desc' + space_description);
    SpaceCRUD.create({'SpaceName' : SpaceName, 'SpaceDescription' : SpaceDescription, 'SpaceSize' : SpaceSize, 'Pax' : Pax,  'SpacePricing' : SpacePricing, 
	'SpaceAmenities' : SpaceAmenities,'Img':Img}, 
 
	function (err, vals) {
          if (!err) {
        var resdata = {
          status: true,
          message: 'user answer successfully added'   };
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
     
 /******************  End create *****************/


exports.deletespace = function(req,res) {
   var SpaceId = parseInt(req.params.id);
   
   
   console.log(SpaceId);
   SpaceCRUD.destroy({'SpaceId' : SpaceId}, function (err, vals) {
     console.log(SpaceId);
    
if (!err) {
        var resdata = {
          status: true,
          message: 'user answer successfully deleted'
        };
        res.jsonp(resdata);
      } else {
        var resdata = {
          status: false,
          message: 'record not deleted'
        };

	  	     }
       });
    
}

// exports.deletespace = function(req, res) {
// //    var id = parseInt(req.params.id);
// //    SpaceCRUD.destroy({'SpaceId' : id}, function (err, vals) {
// //    console.log(vals.affectedRows);
// //   	if(parseInt(vals.affectedRows)>0){
// //   		var resdata={status:true,
// //   		      message:'space successfully deleted'};
// // 	  	res.jsonp(resdata);
// // 	  	}else{
// // 	  		 var resdata={status:false,
// //   		      message:'record not found '};
// // 	  	      res.jsonp(resdata);
// // 	  	     }
// //        });
// //     };
   

 exports.spacedetail = function(req, res) {
  var id=parseInt(req.params.id);
  console.log(id);
        var query = "SELECT * FROM Space where `SpaceId`="+id;
              db.query(query, function(err, rows){
              res.jsonp(rows);
              console.log(rows);
   });
 };

 exports.viewspace = function (req, res) {
  var query = "SELECT * FROM  Space";
  db.query(query, function (err, rows) {
    res.jsonp(rows);

  });
}; 

exports.updatespace = function(req, res) {
	  var SpaceId = req.body.SpaceId;
    var SpaceName = req.body.SpaceName;
    var SpaceDescription = req.body.SpaceDescription;
    var SpaceSize = req.body.SpaceSize; 
    var Pax = req.body.Pax; 
    var SpacePricing = req.body.SpacePricing; 
    var SpaceAmenities = req.body.SpaceAmenities; 
    var Img=req.body.Img;
      console.log(SpaceId);

 SpaceCRUD.update({'SpaceId' : SpaceId}, {'SpaceName' : SpaceName, 'SpaceDescription' :SpaceDescription, 'SpaceSize' : SpaceSize,'Pax' : Pax,  'SpacePricing' : SpacePricing,'SpaceAmenities' : SpaceAmenities,'Img': Img}, function (err, vals) {

          if (!err) {
        var resdata = {
          status: true,
          message: 'space successfully added'   };
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

//  exports.findVendorPassword = function(req, res){
//   var vendorEmail = req.params.email;
//   var query = "select password from user_vendor where `emailID` ='" + vendorEmail + "'";
//   db.query(query, function (err, rows){
              
//     for(var i=0; i<rows.length; i++){

//       res.jsonp(rows[i].password);
//     }
//   })
// }




