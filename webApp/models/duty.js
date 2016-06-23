var mongoose = require('mongoose');

var dutySchema = mongoose.Schema({
	localID: Number,
	name: String,
	doneBy: String
});

var duty = mongoose.model('duty', dutySchema);
exports.duty = duty;
