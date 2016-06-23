var express = require('express');
var bodyParser = require('body-parser');
var helper = require('../helper/duty.js');

var router = express.Router();

router.use(bodyParser.json());

router.get('/all', function(request, response){
  helper.getAllDuties(function(duties){
    response.send(duties);
  });
});

router.get('/:name', function(request, response){
	var name = request.params.name;
	helper.getDuty(name, function(duty){
    response.send(duty);
  });
});

router.post('/', function(request, response){
  var duty = request.body;
  helper.addDuty(duty, function(data){
    response.send(data);
  });
});

router.post('/addmultiple', function(request, response){
  var duties = request.body;  
  helper.addMultiple(duties, function(data){
    response.send(data);
  });
});

router.put('/:name', function(request, response){
  var duty = request.body;
  var name = request.params.name;
  helper.editDuty(name, duty, function(data){
    response.send(data);
  });
});

module.exports = router;
