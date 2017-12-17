const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: true
	},
	Email: {
		type: String,
		required: true
	},
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'Email', passwordField: 'Password' });

module.exports = mongoose.model('User', UserSchema);