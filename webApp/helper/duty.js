var mongoose = require('mongoose');
var model = require('../models/duty.js');
var Duty = model.duty;

var getAllDuties = function(callback){
  Duty.find({},
    function(err, dutiesData){
      if(err) console.log(err);
	  var duties = new Array(dutiesData.length);
	  for(var i = 0; i<dutiesData.length; i++){
		var newDuty = new Duty({
			name: dutiesData[i].name,
			doneBy: dutiesData[i].doneBy
		  });
		  duties.push(newDuty);
	  }
      callback(duties);	  
    }
  )};


var addDuty = function(duty, callback){
  var newDuty = new Duty({
    name: duty.name,
    doneBy: duty.doneBy
  });

  newDuty.save(
    function(err){
      if(err) console.log(err);
      callback({'response': "duty added"});
    });
}

module.exports = {
  getAllDuties: getAllDuties,
  addDuty: addDuty
}
