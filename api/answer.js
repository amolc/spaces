var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
  database: 'cfo_singapore',
  user: 'cio_choice',
  password: '10gXWOqeaf',
  host: 'cxohonour.com',
});
var nodemailer = require('nodemailer');
var sleep = require('system-sleep');
var mg = require('nodemailer-mailgun-transport');
var CRUD = require('mysql-crud');
var answerCRUD = CRUD(db, 'answer');
var answer_jobCRUD = CRUD(db, 'answer_job');
var transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: '587',
  auth: {
    user: '66ca4479851e0bd9cedc629bdff36ee6',
    pass: 'a3ec60f55a89f7fab98891e86818c8db'
  }
});
var async = require('async');



function send_mail(usermail, subject, mailbody) {

  var auth = {
    auth: {
      api_key: 'key-b4687b67307cb2598abad76006bd7a4a',
      domain: '80startups.com'
    }
  }

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));

  nodemailerMailgun.sendMail({
    from: 'operations@80startups.com',
    to: usermail, // An array if you have multiple recipients.
    subject: subject,
    'h:Reply-To': 'operations@80startups.com',
    //You can use "html:" to send HTML email content. It's magic!
    html: mailbody,
    //You can use "text:" to send plain-text content. It's oldschool!
    text: mailbody
  }, function(err, info) {
    if (err) {
      console.log('Error: ' + err);
    } else {
      console.log('Response: ' + info);
    }
  });
};



exports.createNewAnswer = function(req, res) {

  var item_ID = req.body.item_ID;
  var userID = req.body.userID;

  var user_answer = req.body.user_answer;
  var stringAns = user_answer.toString();
  var dataAns = stringAns.split(',');


  dataAns.forEach(function(y) {
    answerCRUD.create({
      'item_ID': item_ID,
      'userID': userID,
      'user_answer': y
    }, function(err, vals) {

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

  })

};
exports.allspace = function(req, res) {
 		 var query = "SELECT * from Space";
db.query(query, function(err, rows){
    res.jsonp(rows);
   });
 }; 


exports.findAnswerById = function(req, res) {
  console.log(parseInt(req.params.userid));
  var data = parseInt(req.params.userid);

  var query = 'select * from answer where `userID`="' + data + '";';
  console.log(query);
  db.query(query, function(err, rows) {

    res.jsonp(rows);
    console.log(rows);
  });
}

function sendRed(req, res) {
  var query = "select distinct(short_name),item_ID from answer_job where `classification`= 'red'";
  //console.log(query);
  db.query(query, function(err, rows) {
     //res.jsonp(rows);
     //console.log(rows);
    for (var i = 0; i < rows.length; i++) {
      // console.log(rows[i]);
      // console.log(rows[i].short_name.trim());
      // console.log(rows[i].item_ID);
      var coyName = rows[i].short_name;
      var query2 = "select item_name from item where `item_ID`= " + rows[i].item_ID;
      console.log(query2);
      db.query(query2, function(err, rows2){

      var query3 = "select contact_email from company_staff where `short_name`= '" + coyName.trim() + "'";
      //console.log(query2);
     
          db.query(query3, function(err, rows3) {
          //console.log(rows);

          if (rows2.length > 0) {
            for (var i=0; i<rows2.length;i++) {
              var item_name = rows2[i].item_name;
              console.log(item_name);}}

          if (rows3.length > 0) {
            for (var j = 0; j < rows3.length; j++) {

              var officeremail = rows3[j].contact_email;
              var subject = "CFOHONOUR AWARDS - Your company is endorsed by CIO";
              var mailbody = coyName + ' has been endorsed by the CFO Community of  Singapore For Excellence.<br/>ICM Category: <strong>' + item_name + ' (In red list)</strong><br>';

                +
                "Thanks, CFO Community";

              send_mail(officeremail, subject, mailbody);

            }
          }
        })
      })    
    }
  });
}
  function sendPink(req, res){
    var query = "select distinct(short_name),item_ID from answer_job where `classification`= 'pink'";
  //console.log(query);
  db.query(query, function(err, rows) {

    //console.log(rows);

    for (var i = 0; i < rows.length; i++) {
      // console.log(rows[i]);
      // console.log(rows[i].short_name.trim());
      // console.log(rows[i].item_ID);

      var coyName = rows[i].short_name;
      var query2 = "select item_name from item where `item_ID`= " + rows[i].item_ID;
      //console.log(query2);

      db.query(query2, function(err, rows2){

         
      var query3 = "select contact_email from company_staff where `short_name`= '" + coyName.trim() + "'";
          
          db.query(query3, function(err, rows3) {
          //console.log(rows);

          if (rows2.length > 0) {
            for (var i=0; i<rows2.length;i++) {
              var item_name = rows2[i].item_name;
              console.log(item_name);}}

          if (rows3.length > 0) {
            for (var j = 0; j < rows3.length; j++) {
              
              var officeremail = rows3[j].contact_email;
              var subject = "CFOHONOUR AWARDS - You have been Nominated by the CFO";
              var mailbody = coyName + ' has been endorsed by the CFO Community of  Singapore For Excellence.<br/>ICM Category: <strong>' + item_name + ' (In pink list)</strong><br>';
                

                +
                "Thanks, CFO Community";

              send_mail(officeremail, subject, mailbody);

            }
          }
        })
      })    
    }
  });
    
}

exports.sendNomination = function(req, res){
  sendPink();
  sendRed();
}
  
//pskini@unisoftinfotech.com
//deepak.nakil@unisoftinfotech.com

// var officeremail = rows3[j].contact_email;
//               var subject = "CFOHONOUR AWARDS - You have been Nominated by the CFO";
//               var mailbody = coyName + ' has been endorsed by the CFO Community of  Singapore For Excellence.<br/>ICM Category: <strong>' + item_name + ' (In pink list)</strong><br>';
                

//                 +
//                 "Thanks, CFO Community";

exports.classify = function(req, res) {
	var data = {} ;
	var query = 'select user_answer, item_ID from answer';

	db.query(query, function(err, rows) {
        async.forEach(rows, function(singlerow, callback) {
              
              var data ={};
            	data.item_id  =  singlerow.item_ID;
		 	      	data.user_answer = singlerow.user_answer.trim();
              
              matchlogic( data, function (error,response) {
        
                answer_jobCRUD.create({'item_ID': data.item_id, 'short_name': data.user_answer, 'classification': response}, function (err, vals) {
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
                
              });
            }, function(err) {
        });
	});

}


function matchlogic(data,callback){

	var query1 = 'select pink_ids, item_ID from item where `item_ID` =' + data.item_id;
	var type = "red";

	db.query(query1, function(err, rows1) {
				var itemid = rows1[0].item_ID;
				var pinkids = rows1[0].pink_ids;

				var pink_item = pinkids.split(",");
				var pink_list = [];
				

					for (var k = 0; k < pink_item.length; k++) {
						pink_list[k] = pink_item[k].trim();

						if(pink_list[k]===data.user_answer){
							type = "pink";
              break;
						}
					}
          callback("",type)
	});
}


