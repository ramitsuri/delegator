var mongoose = require('mongoose');
var http = require('https');
var querystring = require('querystring');

var model = require('../models/residents.js');
var Resident = model.resident;

var sendNotification = function(recipient, messageText){
	
var notificationData = querystring.stringify({
  to : recipient,
  priority:"high",
  data : {
   text: messageText
     }
});

var options = {
  host: 'fcm.googleapis.com',
  path: '/fcm/send',
  method: 'POST',
  port: 443,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'key=AIzaSyBh0OKyNDVTc14OpZRMcyDfR4qxvUHeBdM'
  }
};

var post_req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(notificationData);
  post_req.end();
}

var registerTokenID = function(residentName, tokenID, callback){
	Resident.findOneAndUpdate({name: residentName}, {fcmToken:tokenID}, 
		function(err, resident){
			if(err) console.log(err);
			callback("token updated");
		});
}

module.exports = {
	sendNotification: sendNotification
}

