var express = require('express');
var bodyParser = require('body-parser');
var helper = require('../helper/notification.js');

var router = express.Router();

router.use(bodyParser.json());

router.get('/all', function(request, response){
  helper.sendNotification("", "");
});

module.exports = router;