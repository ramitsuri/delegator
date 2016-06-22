var mongoose = require('mongoose');

var residentSchema = mongoose.Schema({
  name: String
});

var resident = mongoose.model('resident', residentSchema);
export.resident = resident;
