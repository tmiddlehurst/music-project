var BandSchema = mongoose.Schema({
  'name': String,
  'size': Number,
  'formedIn': String,
  'genre': [String],
  'rating': Number,
  'image': String

})