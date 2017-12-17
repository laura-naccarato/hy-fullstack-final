const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
	Date: {
		type: String,
		required: true
	},
	Name: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Game', GameSchema)