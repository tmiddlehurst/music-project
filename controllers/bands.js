function indexBands(req, res) {
	Band.find ({} , function(err, cars) {
		if(err) return res.status(500).send(err);
		res.render("bands/index" , {
			title: "Bands",
			bands: bands
		});
	});
}

function showBands(req, res) {
	Band.findById(rew.params.id , function(err, car) {
		if(!car) return res.status(404).send("Not found");
		if(err) return res.status(500).send(err);
		res.render("bands/show" , {
			title: "Band",
			band: band
		});
	});
}


function newBands(req, res) {
	var newBand = {
		name: "",
		yearsActive: [""],
		genre: [""],
		members: 0,
		rating: 0,
		image: ""
	}
}

function createBands(req, res) {
	res.send('create');
}

function editBands(req, res) {
	res.send('edit');
}

function updateBands(req, res) {
	res.send('update');
}

function deleteBands(req, res) {
	res.send('delete');
}

/* function indexCars(req, res) {
  Car.find({} , function(err, cars) {
    if(err) return res.status(500).send(err);
    res.render("cars/index" , {
      title: "Cars",
      cars: cars
    });
  });
}


  res.render("cars/new" , {
    title: "New Car",
    car: newCar
  });
}

function createCars(req, res) {
  Car.create(req.body, function(err, car){
    if(err) return res.status(500).send(err);
    res.redirect("/");
  });
}

function editCars(req, res) {
  Car.findById(req.params.id , function(err, car) {
    if(!car) return res.status(404).send("Not found");
    if(err) return res.status(500).send(err);
    res.render("cars/edit" , {
      title: "Car",
      car: car
    });
  });
}

function updateCars(req, res) {
  Car.findByIdAndUpdate(
    req.params.id,
    { $set:  req.body },
    { runValidators: true },
    function(err , car){
      if(err) return res.status(500).send(err);
      res.redirect("/");
    }
  );
}

function deleteCars(req , res) {
  Car.findByIdAndRemove(req.params.id , function(err) {
    res.redirect("/");
  });
}

module.exports = {
	index: indexCars,
	show: showCars,
	new: newCars,
	create: createCars,
	edit: editCars,
	update: updateCars,
	delete: deleteCars
} */

module.exports = {
	index: indexBands,
	show: showBands,
	new: newBands,
	create: createBands,
	edit: editBands,
	update: updateBands,
	delete: deleteBands
}