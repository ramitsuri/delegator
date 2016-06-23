var mongoose = require('mongoose');
var model = require('../models/residents.js');
var Resident = model.resident;

var getAllResidents = function(callback){
  Resident.find({},
    function(err, residentData){
      if(err) console.log(err);
	  var residents = new Array(residentData.length);
	  for(var i = 0; i<residentData.length; i++){
		var newResident = {
			localID: residentData[i].localID,
			name: residentData[i].name,
			fine: residentData[i].fine
		  };
		  residents[i] = newResident;
	  }
      callback(residents);	  
    }
  )};
  
var getResident = function(residentName, callback){
  Resident.findOne({name: residentName},
    function(err, residentData){
      if(err) console.log(err);	  	 
		var newResident = {
			localID: residentData.localID,
			name: residentData.name,
			fine: residentData.fine
		  };		  
      callback(newResident);	  
    }
  )};

  
var addResident = function(resident, callback){
  var newResident = new Resident({
	localID: resident.localID,
    name: resident.name,
    fine: resident.fine
  });

  newResident.save(
    function(err){
      if(err) console.log(err);
      callback({'response': "resident added"});
    });
};

var editResident = function(residentName, resident, callback){
	Resident.findOneAndUpdate({name: residentName}, {name:resident.name, fine: resident.fine, localID: resident.localID}, 
		function(err, resident){
			if(err) console.log(err);
			callback("updated");
		});
}

var increaseFine = function(residentName, newFine, callback){
	Resident.findOneAndUpdate({name: residentName}, {$inc: {fine: newFine}}, 
		function(err, resident){
			if(err) console.log(err);
			callback("fine increased");
		});
}

module.exports = {
  getAllResidents: getAllResidents,
  getResident: getResident,
  addResident: addResident,
  editResident: editResident,
  increaseFine: increaseFine
}