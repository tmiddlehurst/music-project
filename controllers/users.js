var User = require ('../models/user.js')

function showUser(req, res) {
	Band.findById(req.params.id , function(err, user) {
		if(!user) return res.status(404).send("Not found");
		if(err) return res.status(500).send(err);
		res.render("users/show" , {
			title: "User",
			user: user
		});
	}); 
}

function newUser(req, res) {
	var newUser = {
		username: "",
		email: "",
		password: "",
		profileImage: ""
	};
	res.render("users/new" , {
		title: "New User",
		user: newUser
	}); 
}

function createUser(req, res) {
	console.log(req.body);
	Band.create(req.body, function(err, band) {
		if(err) return res.status(500).send(err);
		res.redirect("/");
	});
}