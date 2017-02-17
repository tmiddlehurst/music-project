var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./config/routes');
var layouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var User = require('./models/user');
var flash = require('connect-flash');


//sessions
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'spartasupersecretkey'
}));

//Load logged in user
app.use(function(req,res,next) {

  // no user id? just move on
  if(!req.session.user) {
  	 res.locals.user = false;
    next();
  } else {

    // load the user with the ID in the session
    User.findById(req.session.user , function(err, user){
      
      if(user) {
        // add the user to the request object
        req.user = user;
        // add it to locals so we can use it in all templates
        res.locals.user = user;
      } else {
        // couldn't find it... that's weird. clear the session
        req.session.user = null;
      }

      next(err);
    });
  }
});

//cookie parser
app.use(cookieParser());

//flash messages
app.use(flash());

// middleware to make flash messages available in every template
app.use(function(req, res, next){
    // res.locals will be available in every template
    res.locals.errors = req.flash('error');
    console.log(res.locals.errors);
    next();
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//override 
app.use(methodOverride(function(req, res){
  	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
  		// look in urlencoded POST bodies and delete it
    	var method = req.body._method
    	delete req.body._method
    	return method
	}
}));

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
