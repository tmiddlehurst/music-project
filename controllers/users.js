var User = require ('../models/user.js')

// SHOW USER
function showUser(req, res) {
	User.findById(req.params.id , function(err, user) {
		if(!user) return res.status(404).send("Not found");
		if(err) return res.status(500).send(err);
		res.render("users/show" , {
			title: "User",
			user: user
		});
	}); 
}

// NEW - GET
function newUser(req, res) {
	//create and empty user
	var newUser = {
		id: "",
		username: "",
		email: "",
		password: "",
		profileImage: ""
	};
	res.render("users/new" , {
		title: "Register",
		user: newUser
	}); 
}

//CREATE - POST
function createUser(req, res) {
	User.create(req.body, function(err, user) {
		if(err) return res.status(500).send(err);
		res.redirect("/");
	});
}

module.exports = {
	new: newUser,
	create: createUser,
	show: showUser
}