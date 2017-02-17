var Band = require('../models/band.js');

function indexBands(req, res) {
	Band.find ({} , function(err, bands) {
		if(err) return res.status(500).send(err);
		res.render("bands/index" , {
			title: "Bands",
			bands: bands
		});
	});// TESTED
}

function showBands(req, res) {
	Band.findById(req.params.id , function(err, band) {
		if(!band) return res.status(404).send("Not found");
		if(err) return res.status(500).send(err);
		res.render("bands/show" , {
			title: "Band",
			band: band
		});
	}); // TESTED
}


function newBands(req, res) {
	var newBand = {
		name: "",
		yearsActive: [""],
		genre: [""],
		image: ""
	};
	res.render("bands/new" , {
		title: "New Band",
		band: newBand
	}); 
}

function createBands(req, res) {
	console.log(req.body);
	Band.create(req.body, function(err, band) {
		if(err) return res.status(500).send(err);
		res.redirect("/");
	});
}

function editBands(req, res) {
	Band.findById(req.params.id , function (err, band) {
		if(!band) return res.status(404).send("Not found");
		if(err) return res.status(500).send(err);
		res.render("bands/edit" , {
			title: "Band",
			band: band
		});
	});
}

function updateBands(req, res) {
	Band.findByIdAndUpdate (
		req.params.id,
		{ $set: req.body }, 
		{ runValidators: true},
		function (err , band) {
			if (err) return res.status(500).send(err);
			res.redirect("/");
		}
	);
}

function deleteBands(req, res) {
	Band.findByIdAndRemove(req.params.id , function(err) {
    	res.redirect("/");
  	});
}


module.exports = {
	index: indexBands,
	show: showBands,
	new: newBands,
	create: createBands,
	edit: editBands,
	update: updateBands,
	delete: deleteBands
}