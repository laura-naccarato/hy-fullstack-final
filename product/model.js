const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: true
	},
	Cost: {
		type: Number,
		required: true
	},
	Price: {
		type: Number,
		required: true
	},
	Stock: {
		type: Number,
		default: 0
	},
	Royalties: { type: Number },
	IsShirt: { type: Boolean, default: 0 },
	Size: {
		type: String,
		enum: ['XS', 'S', 'M', 'L', 'Xl', 'XXL', 'XXXL']
	},
	Cut: {
		type: String,
		enum: ['child', 'relaxed', 'fitted']
	},
	Discontinued: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('Product', ProductSchema)