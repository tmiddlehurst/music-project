
var express = require('express');
var port = process.env.PORT || 3000;
 	
app.listen(port, function() {
	console.log("The server is on and listening on port " + port);
})
	app.get('/', function(req, res) {
	res.send('Request working.')
})