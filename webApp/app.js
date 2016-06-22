var express = require('express');
var mongoose = require('mongoose');


var dutyRoutes = require('./routes/duty.js');
var app = express();
var ipAddress = "localhost:27017";
var dbName = "delegator";
var port = 1398;

mongoose.connect('mongodb://' + ipAddress + '/' + dbName + '');

app.use('/duty', dutyRoutes);

app.listen(port);
console.log("starting on port: " + port);
