var mongoose = require('mongoose');
var BandSchema = mongoose.Schema ({
	id: {
		type: Number,
		required:true,
		unique: true
	},

	name: {
		type:String,
		required: true,
		unique: true
	},

	yearsActive: {
		type:[String],
		required:true,
	},

	genre: {
		type:[String],
		required:true,
	},
	members: {
		type:Number,
		required:true,
		min:1
	},

	rating: {
		type:Number,
		required:true
	},

	image: String

})

module.exports = mongoose.model('Band', BandSchema);