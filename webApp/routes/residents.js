var express = require('express');
var bodyParser = require('body-parser');
var helper = require('../helper/residents.js');

var router = express.Router();

router.use(bodyParser.json());

router.get('/all', function(request, response){
  helper.getAllResidents(function(residents){
    response.send(residents);
  });
});

router.get('/:name', function(request, response){
	var name = request.params.name;
  helper.getResident(name, function(resident){
    response.send(resident);
  });
});

router.post('/', function(request, response){
  var resident = request.body;
  helper.addResident(resident, function(data){
    response.send(data);
  });
});

router.put('/:name', function(request, response){
  var resident = request.body;
  var name = request.params.name;
  helper.editResident(name, resident, function(data){
    response.send(data);
  });
});

router.put('/:name/fine/increase/:newFine', function(request, response){
  var newFine = request.params.newFine;
  var name = request.params.name;
  helper.increaseFine(name, newFine, function(data){
    response.send(data);
  });
});

module.exports = router;
