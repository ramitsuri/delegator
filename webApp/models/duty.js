var mongoose = require('mongoose');

var dutySchema = mongoose.Schema({
  name: String,
  doneBy: String
});

var duty = mongoose.model('duty', dutySchema);
exports.duty = duty;
