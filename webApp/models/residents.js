var mongoose = require('mongoose');

var residentSchema = mongoose.Schema({
  localID: Number,
  name: String,
  fine: Number,
  fcmToken: String  
});

var resident = mongoose.model('resident', residentSchema);
exports.resident = resident;
