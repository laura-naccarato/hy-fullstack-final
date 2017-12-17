const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
	StartDate: {
		type: String,
		required: true
	},
	EndDate: {
		type: String,
		required: true
	},
	Title: {
		type: String,
		required: true
	},
	Games: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Game'
	}]
})

module.exports = mongoose.model('Season', SeasonSchema)