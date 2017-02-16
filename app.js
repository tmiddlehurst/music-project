var port = process.env.PORT || 3000;
var express = require('express');
var mongoose = require('mongoose');


var router = require('./config/routes');

mongoose.connect('mongodb://localhost/', function() {
	console.log('database connected.')
 	
app.use(router);
 	
app.listen(port, function() {
	console.log("The server is on and listening on port " + port);
})
