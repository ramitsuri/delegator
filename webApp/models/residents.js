var mongoose = require('mongoose');

var residentSchema = mongoose.Schema({
  localID: Number,
  name: String,
  fine: Number
  
});

var resident = mongoose.model('resident', residentSchema);
export.resident = resident;
