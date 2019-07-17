var mongoose = require('mongoose');


var schema = mongoose.Schema({
	name: {type: String, required: true},
	userId: {type: String, required: true},

})

module.exports = mongoose.model('User', schema);

