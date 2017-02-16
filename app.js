var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var mongoose = require('mongoose');


var router = require('./config/routes');
 	
app.use(router);

mongoose.connect('mongodb://localhost/', function() {
	console.log('database connected.')
});
 	
app.listen(port, function() {
	console.log("The server is on and listening on port " + port);
});

module.exports = app;
