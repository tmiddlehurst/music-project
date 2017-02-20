var mongoose = require('mongoose');
var BandSchema = mongoose.Schema ({

	name: {
		type: String,
		required: true,
		unique: true
	},

	yearsActive: [{
		type: String,
		required: true,
	}],

	genre: [{
		type: String,
		required: true,
	}],
	members: {
		type: Number,
		required: true,
		min:1
	},

	rating: {
		type:Number,
		required:true
	},

	image: String,

	likes: {
		type: Number
	}

});

module.exports = mongoose.model('Band', BandSchema);