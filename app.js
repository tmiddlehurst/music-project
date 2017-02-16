var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./config/routes');
var layouts = require('express-ejs-layouts');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(layouts);

mongoose.connect('mongodb://localhost/BandIt', function() {
	console.log('database connected.')
});

app.use(router);
 	
app.listen(port, function() {
	console.log("The server is on and listening on port " + port);
});

module.exports = app;
