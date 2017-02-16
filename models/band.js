var BandSchema = mongoose.Schema({
  'name': {
  	type:String,
  	required: true,
  	unique: true
  },

  'members': {
  	type:Number,
  	required:true,
  	min:1
  },

  'yearsActive': {
  	type:[String],
  	required:true,
  },

  'genre': {
  	type:[String],
  	required:true,
  },

  'rating': {
  	type:Number,
  	required:true
  },

  'image': String

})

module.exports = mongoose.model('Car', CarSchema);