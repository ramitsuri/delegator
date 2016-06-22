var mongoose = require('mongoose');
var model = require('../models/duty.js');
var Duty = model.duty;

var getAllDuties = function(callback){
  Duty.find({},
    function(err, duties){
      if(err) console.log(err);
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
