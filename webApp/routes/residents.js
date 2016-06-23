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

router.post('/', function(request, response){
  var resident = request.body;
  helper.addResident(resident, function(data){
    response.send(data);
  });
});

module.exports = router;
