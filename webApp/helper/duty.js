var mongoose = require('mongoose');
var model = require('../models/duty.js');
var Duty = model.duty;

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

var editDuty = function(id, duty, callback){
	Duty.findOneAndUpdate({localID: id}, {name:duty.name, doneBy: duty.doneBy, localID: duty.localID, lastDoneBy: duty.lastDoneBy}, 
		function(err, duty){
			if(err) console.log(err);
			callback("updated");
		});
}

module.exports = {
  getAllDuties: getAllDuties,
  editDuty: editDuty,
  addDuty: addDuty
}
