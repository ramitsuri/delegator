var mongoose = require('mongoose');
var model = require('../models/duty.js');
var residentModel = require('../models/residents.js');
var schedule = require('node-schedule');
var notificationHelper = require('./notification.js');

var rule = new schedule.RecurrenceRule();
rule.hour = 1;
rule.minute = 0;

var Duty = model.duty;
var Resident = residentModel.resident;

var getAllDuties = function(callback){
  Duty.find({},
    function(err, dutiesData){
      if(err) console.log(err);
	  var duties = new Array(dutiesData.length);
	  for(var i = 0; i<dutiesData.length; i++){
		var newDuty = {
			name: dutiesData[i].name,
			doneBy: dutiesData[i].doneBy,
			localID: dutiesData[i].localID,
			lastDoneBy: dutiesData[i].lastDoneBy
		  };
		  duties[i] = newDuty;
	  }
      callback(duties);
    }
  )};

var getDuty = function(dutyName, callback){
  Duty.findOne({name: dutyName},
    function(err, dutyData){
      if(err) console.log(err);
		var newDuty = {
			localID: dutyData.localID,
			name: dutyData.name,
			doneBy: dutyData.doneBy,
			lastDoneBy: dutyData.lastDoneBy
		  };
      callback(newDuty);
    }
  )};

var addDuty = function(duty, callback){
  var newDuty = new Duty({
    name: duty.name,
    doneBy: duty.doneBy,
	localID: duty.localID,
	lastDoneBy: duty.lastDoneBy
  });

  newDuty.save(
    function(err){
      if(err) console.log(err);
      callback({'response': "duty added"});
    });
};

var editDuty = function(dutyName, duty, callback){
	Duty.findOneAndUpdate({name: dutyName}, {name:duty.name, doneBy: duty.doneBy, localID: duty.localID, lastDoneBy: duty.lastDoneBy},
		function(err, duty){
			if(err) console.log(err);
			callback("updated");
		});
}

var updateDuties = function(){
	var duties;
	var residents;
			Resident.find({}).sort({localID: 'asc'}).exec(function(err, residentData){
				if(err) console.log(err);
				residents = residentData;
				Duty.find({}).sort({localID: 'asc'}).exec(
					function(err, dutiesData){
						if(err)console.log(err);
						duties = dutiesData;
						var firstResident = residents.filter(function(item) {
												return item.name === duties[0].doneBy;
							});
						var j = firstResident[0].localID - 1;

						for(var i=0; i<duties.length; i++){
							j = j + 1;
							if(j === residents.length)
								j = 0;
						Duty.findOneAndUpdate({localID: duties[i].localID}, {name:duties[i].name, doneBy: residents[j].name, localID: duties[i].localID, lastDoneBy: duties[i].doneBy},
							function(err, duty){
								if(err) console.log(err);
								//notificationHelper.sendNotification(residents[j].fcmToken, duties[i].name);
                //console.log('updated');
							});
							//console.log("name:" + duties[i].name + "doneBy: " + residents[j].name, "localID: " + duties[i].localID, " lastDoneBy: " + duties[i].doneBy);
						}

						});
			});

		//callback("duties changed");
	};

var runScheduledChangeOfDuty = function(){
	var j = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!');
  });
}

module.exports = {
  getAllDuties: getAllDuties,
  getDuty: getDuty,
  editDuty: editDuty,
  addDuty: addDuty,
  updateDuties: updateDuties
}
