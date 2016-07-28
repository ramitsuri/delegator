var path = require('path');
var express = require('express');
var router = express.Router();
var helper = require('../helper/duty.js');

router.use(express.static(path.join(__dirname, '../public')));
router.get('/', function(request, response){
  helper.getAllDuties(function(duties){
    //response.sendFile(path.join(__dirname, '../public','index.html'));
    response.render(path.join(__dirname, '../public/views/','index.jade'), {duties: duties});
    //console.log(path.join(__dirname, '../public/views','index.jade'));
    });
});

router.get('/everglades', function(request, response){
  
    response.render(path.join(__dirname, '../public/views/','everglades.jade'));
    //console.log(path.join(__dirname, '../public/views','index.jade'));
  
});



module.exports = router;
