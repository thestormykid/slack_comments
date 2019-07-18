var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	text: {type: String, required: true},
	createdAt: {type: Date, default: Date.now()},
	createdBy: {type: String, required: true},
	team: { type: String, required: true },
	channel_name: { type: String, required: true },
	channel_id: { type: String, required: true }
})

module.exports = mongoose.model('Todo', schema);
