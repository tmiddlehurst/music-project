# Node Walkthrough

A step-by-step guide to building a simple node and express application from scratch. 

## Step 1: Setup, Express, Listening and Requesting

 - Create a new project directory on the command line and when inside it, create your `package.json` with the following command. 
	
	```bash
	npm init
	``` 
	This acts as a manifest that lists all the npm modules that are needed to 	run the project as well as more information about testing and running the 	project that we will cover later in the course.

 - Create an `app.js` file in the repository to act as the starting point for the app.
 - In the command line, type `npm install express --save` to include the express package in your project. the `--save` adds the package to `package.json`, so there is a canonical list of all the packages used in the project in that file, under dependencies.
 - At the top of the `app.js`, write the following two lines: 

 	```js
 	var express = require("express");
 	var app = express();
 	```
 	The first line requires the express package, and the second creates a server app for the project. This app, from this file, is what is run when the server is live.
 
 - Still in `app.js`, add the following: 

 	```js
 	var port = process.env.PORT || 3000;
 	
 	app.listen(port, function() {
 		console.log("The server is on and listening on port " + port);
 	})
 	```
 	Here, we have set which port the app should run on. We're saying to use a predefined one for deployment if it exists. If it doesn't exist, our app will run on `localhost:3000`. We must use the `app.listen()` to run the server.
 
 - To test a request, add the following to the `app.js` above the `app.listen()`: 

 	```js
 	app.get('/', function(req, res) {
 		res.send('Request working.')
 	})
 	```
 	
 	At this point, we can run `node app.js` in ther terminal to run the server.
 	Go to `localhost:3000` in the browser and you should see "Request working."
 	
## Step 2: Router
Now we have one request working, lets set up a router to handle all the requests we'll need from the app. 

 - Create new directories for `config` and `controllers` and create the files `config/routes.js` and `controllers/cars.js`.
 - At the top of `routes.js`, add the following: 

 	```js
 	var express = require("express");
 	var router = express.Router();
 	var carsController = require('../controllers/cars');
 	
 	module.exports = router;
 	```
	Here we are instantiating a new express router. This is a self contained module that handles the routing for our app - nifty. We are also exporting this module for use in our `app.js` file, and ensuring our newly created controller is required and accessible in this file.
	
 - Above the `module.exports`, add the following for all of our seven RESTful routes: 

 	```js
	router.route('/')
	  .get(carsController.index)
	  .post(carsController.create);
	
	router.get('/new', carsController.new);
	
	router.route('/:id')
	  .get(carsController.show)
	  .put(carsController.update)
	  .delete(carsController.delete);
	
	router.get('/:id/edit', carsController.edit);
 	```
 	Here we have used router methods to define which controller function to run when the relevant endpoint is hit. Using the correct RESTful HTTP verb and path combinations we can perform all the necessary CRUD functions for a useful web app.
 
 - In the `app.js` add the following lines to replace the temporary `app.get()` method:

 	```js
 	var router = require('./config/routes');
 	
 	app.use(router);
 	```
 	
 	This means the routes will be included in the app, and if any of the routes are requested the router will handle which function to run.
 	
 - The next step is to create the controller functions that these routes link up to. Inside the `controllers/cars.js` file, write the following:

 	```js
 	function indexCars(req, res) {
 		res.send('index');
 	}
 	
 	function showCars(req, res) {
 		res.send('show');
 	}
 	
 	function newCars(req, res) {
 		res.send('new');
 	}
 	
 	function createCars(req, res) {
 		res.send('create');
 	}
 	
 	function editCars(req, res) {
 		res.send('edit');
 	}
 	
 	function updateCars(req, res) {
 		res.send('update');
 	}
 	
 	function deleteCars(req, res) {
 		res.send('delete');
 	}
 	
 	module.exports = {
 		index: indexCars,
 		show: showCars,
 		new: newCars,
 		create: createCars,
 		edit: editCars,
 		update: updateCars,
 		delete: deleteCars
 	}
 	```
	These are the 7 RESTful routes which will not change no matter what 	resource or what app we are building. Our app will always fit this 	pattern.
	
	These can now be tested using Postman or a similar REST client by requesting each route with the correct HTTP verb and url from the routes.
	
## Step 3: The Model
We'll be using a MongoDB database to store our data in BSON collections for each resource. To interact with the database easily from within out code, we'll be using the mongoose ORM. This gives us a huge range of very helpful methods to use. 

- First we need to tell the app to connect to our MongoDB database, locally for the moment. Install the `mongoose` package into the project, requrire it in your `app.js` and add the following line of code directly below your requirements to connect the app to the database:

```
mongoose.connect('mongodb://localhost/autotrader', function() {
	console.log('database connected.')
})
```

- Create a directory called `models` and add a file named `car.js`.

- Inside this file we need to create a Schema for the app to use to store the correct data into the database. Firstly require `mongoose` at the top of the page, then write the following to create the schema: 

```
var CarSchema = mongoose.Schema({
  color: String,
  make: String,
  model: String,
  bhp: Number,
  year: Number,
  miles: Number
})
```

- To make this available as a model for the rest of the app, export it and use the model method as follows: 

```
module.exports = mongoose.model('Car', CarSchema);
```

- We now have a model to use in our controllers and, more importantly, in our tests, but it doesn't have validations attached. Add relevant validations to your data - make good use of required, unique, min, max etc and write your own for specfic cases.
	
## Step 4: Testing 

We will be using TDD for the remainder of this project to en
sure all the routes of the application work as desired. For now, lets write up some tests for the 7 RESTful car routes.

- Make a new directory called `test` and add a new file called `carsTest.js`.

- Install mocha and chai for testing with the following commands: 

	```
	npm i mocha -g
	npm i chai chai-http --save-dev
	```
	Mocha needs to be installed globally as it is a command line tool. Chai and chai-http are used for writing the actual code in the project, and therefore need to be on the package.json as dev dependencies.
	
- Write a test file similar to the following. Notice the use of beforeEach and afterEach methods to create and delete a car - this means we always have a car accessible with an id we know for testing. We are also deleting unnecessary cars after the POST test. 

- Write the line `module.exports = app;` at the bottom of your `app.js` to allow the app to be accessible in the test suite.

- For more info on mocha and chai, and to use any methods or assertions not listed here, see the docs. To run the file for testing, type `mocha tests/carsTest.js` on the command line.

	```
	var chai = require('chai');
	var chaiHttp = require('chai-http');
	var app = require('../app');
	var should = chai.should();
	var expect = require('chai').expect;
	var Car = require('../models/car');
	
	chai.use(chaiHttp);
	
	describe('Cars', function() {
	  var car = new Car({
	    color: "red",
	    make: "ford",
	    model: "fiesta",
	    bhp: 100,
	    year: 2008,
	    miles: 60000
	  });
	
	  beforeEach(function() {
	    car.save(function(err, newCar) {
	      if (err) return console.log(err);
	      console.log("made newCar with id " + newCar.id);
	      car.id = newCar.id;
	    })
	  })
	
	  afterEach(function() {
	    Car.findByIdAndRemove(car.id, function(err) {
	      if (err) return console.log(err);
	    })
	  })
	
	  it('should list ALL cars on / GET', function(done) {
	    var request = chai.request(app);
	    request
	      .get('/')
	      .end(function(err, res){
	        res.should.have.status(200);
	        res.should.be.html;
	        res.text.should.match("All cars");
	        res.text.should.match("ford fiesta");
	        done();
	      });
	  });
	
	  it('should list a SINGLE car on /<id> GET', function(done) {
	    chai.request(app)
	      .get('/' + car.id)
	      .end(function(err, res){
	        res.should.have.status(200);
	        res.should.be.html;
	        res.text.should.match(/Post 1/);
	        done();
	      });
	  });
	
	  it('should add a SINGLE car on / POST' , function(done){
	    var request = chai.request(app);
	    request.post('/')
	      .set('content-type', 'application/x-www-form-urlencoded')
	      .send({
	        _id: 123,
	        color: "green",
	        make: "nissan",
	        model: "micra",
	        bhp: 90,
	        year: 2011,
	        miles: 40000
	      })
	      .end(function(err, res){
	        res.should.have.status(200);
	        res.should.be.html;
	        res.text.should.match(/All cars/);
	        request
	          .get('/123')
	          .end(function(err, res){
	            res.should.have.status(200);
	            res.should.be.html;
	            res.text.should.match(/green/);
	            res.text.should.match(/micra/);
	
	            Car.findByIdAndRemove(123, function(err) {
	              if (err) return console.log(err);
	              done();
	            });
	          });
	      });
	  });
	
	  // describe a test for PUT
	  it('should update a SINGLE car on /<id> PUT' , function(done){
	    var request = chai.request(app);
	    request.put('/' + car.id)
	      .set('content-type', 'application/x-www-form-urlencoded')
	      .send({'color': 'blue', 'miles': 70000})
	      .end(function(err, res){
	        res.should.have.status(200);
	        res.should.be.html;
	        res.text.should.match(/All cars/);
	        request
	          .get('/' + car.id)
	          .end(function(err, res){
	            res.should.have.status(200);
	            res.should.be.html;
	            res.text.should.match(/blue/);
	            res.text.should.match(/miles/);
	            done();
	          });
	      });
	  });
	
	
	  it('should delete a SINGLE car on /<id> DELETE' , function(done) {
	    var request = chai.request(app);
	    request.delete('/' + car.id)
	      .end(function(err, res){
	        res.should.have.status(200);
	        res.should.be.html;
	        res.text.should.match(/All cars/);
	        request
	          .get('/' + car.id)
	          .end(function(err, res){
	            res.should.have.status(404);
	            done();
	          });
	      });
	  });
	});

	```
	
- Before continuing, ensure when the tests run they are all being run and giving chai errors rather than javascript errors.

## Step 5: The Controller

We now need to populate our controller functions with the correct mongoose database methods so they make the correct requests. Your final controller should look similar to the one below. We have covered this a lot - if you are sill worried about these let me know!

```
	var Car = require('../models/car');

function indexCars(req, res) {
  Car.find({} , function(err, cars) {
    if(err) return res.status(500).send(err);
    res.render("cars/index" , {
      title: "Cars",
      cars: cars
    });
  });
}

function showCars(req, res) {
  Car.findById(req.params.id , function(err, car) {
    if(!car) return res.status(404).send("Not found");
    if(err) return res.status(500).send(err);
    res.render("cars/show" , {
      title: "Car",
      car: car
    });
  });
}

function newCars(req , res) {
  var newCar = {
    color: "",
    make: "",
    model: "",
    bhp: 0,
    year: 0,
    miles: 0
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
}
```

	
## Step 6: The Views
	
	Now we need to set up the pages the use will view. For this we will use 	`ejs` and `express-ejs-layouts`. Ejs is embedded javascript, and is an 	easy to use templating engine to serve HTML from an express app. Layouts 	is a module we can use to organise our ejs files most logically.
	
- Install the two packages mentioned above, and write the following in your app: 

```
var layouts = require('express-ejs-layouts');

express.set('view engine', 'ejs);
app.use(layouts);
``` 

- Create a directory called `views`. Ejs will look in here by default for the  view files to serve when given a simple path.

- Within views, make a file called `layout.ejs`. This will be the main template that is loaded by layouts for every page that is rendered. Inside add the following: 

```
<!DOCTYPE html>
<html>
<head>
  <title>autotrader</title>
</head>
<body>
   <%- body %>
</body>
</html>
```
	
- The body ejs tag is where the rest of the content will be displayed. This page acts exactly like standard html, but javascript can be inserted and run in the <% %> tags.

- Make a directory in views called `cars`. Inside here, create five files: index.ejs, new.ejs, edit.ejs, show.ejs and form.ejs. These are for other html templates we will need. For now, add plain text to these file