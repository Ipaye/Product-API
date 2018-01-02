const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		unique: true,
		required: 'Email is required'
	},
	password: {
		type: String,
		required: 'Password is required'
	}
});

module.exports = mongoose.model('User', userSchema);
