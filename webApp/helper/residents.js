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

var editResident = function(id, resident, callback){
	Resident.findOneAndUpdate({localID: id}, {name:resident.name, fine: resident.fine, localID: resident.localID}, 
		function(err, resident){
			if(err) console.log(err);
			callback("updated");
		});
}

module.exports = {
  getAllResidents: getAllResidents,
  addResident: addResident,
  editResident: editResident
}