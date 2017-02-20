var Band = require('../models/band.js');

function indexBands(req, res) {
	Band.find ({} , function(err, bands) {
		if(err) req.flash('error' , err.message);
		res.render("bands/index" , {
			title: "Bands",
			bands: bands
		});
	});
}
									// TESTED
function showBand(req, res) {
	Band.findById(req.params.id , function(err, band) {
		if(!band) return res.status(404).send("Not found");
		if(err) req.flash('error' , err.message);
		res.render("bands/show" , {
			title: "Band",
			band: band
		});
	}); 
}
									// TESTED


function newBand(req, res) {
	var newBand = {
		name: "",
		yearsActive: [""],
		genre: [""],
		image: "",
		likes: 0
	};
	res.render("bands/new" , {
		title: "New Band",
		band: newBand
	}); 
}

function createBand(req, res) {
	Band.create(req.body, function(err, band) {
	    // check for errors and store a flash message if there was a problem
	    if(err) req.flash('error' , err.message);
	  
	    // redirect the user to a GET route. We'll go back to the INDEX.
	   res.redirect("/");
	});
}

function editBand(req, res) {
	Band.findById(req.params.id , function (err, band) {
		if(!band) return res.status(404).send("Not found");
	    // check for errors and store a flash message if there was a problem
	    if(err) req.flash('error' , err.message);
		res.render("bands/edit" , {
			title: "Band",
			band: band
		});
	});
}

function updateBand(req, res) {
	Band.findByIdAndUpdate (
		req.params.id,
		{ $set: req.body }, 
		{ runValidators: true},
		function (err , band) {
			if(err) req.flash('error' , err.message);
			res.redirect("/");
		}
	);
}

function deleteBand(req, res) {
	Band.findByIdAndRemove(req.params.id , function(err) {
		if(err) req.flash('error' , err.message);
    	res.redirect("/");
  	});
}
									// TESTED


module.exports = {
	index: indexBands,
	show: showBand,
	new: newBand,
	create: createBand,
	edit: editBand,
	update: updateBand,
	delete: deleteBand
}