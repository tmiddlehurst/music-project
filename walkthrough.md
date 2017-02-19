#Authentication walkthrough

## Cookies and Sessions

Let's add support for cookies to our app:

```bash
npm install cookie-parser --save
```

Cookies are sent along with ever request by the browser. With the body data we needed the body-parser package to collect the data and put it in the req object for us. Now we need the cookie-parser to do the same with cookies.

Open app.js and add the following:

```javascript
var cookieParser = require('cookie-parser');

// add support for cookies
app.use(cookieParser());
```
Let's get sessions set up:

```bash
npm install express-session --save
```

Add the configuration script to the app.js ***after*** your cookie middleware:

```javascript
var session = require('express-session');

...

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'spartasupersecretkey'
}));
```

And that's it. We now have a req.session object to work with. The extra options we passed aren't really important to us right now but here's what they are:

* resave - should all sessions be saved to the database even if nothing was changed
* saveUnitiliazed - should new sessions be saved even if they're empty
* secret - the key to use for encrypting our session data. Like a password

If you refresh your page you'll see the log in the terminal but you'll also see that we have a new cookie in the browser called ``connect.sid``. This is how the browser tells cthe server which session belongs to it. 

You can store pretty much any json object ( minus the methods ) in the session. It doesn't just have to be simple numbers. So sessions are great for storing information about the logged in user.

## Flash messages

Let's install a package called connect-flash to help us:

```bash
npm install connect-flash --save
```

Because this package uses both cookies and session the setup ***must*** come last.

```javascript
var flash = require('connect-flash');

...

app.use(flash());
```

Now that that's setup we have a flash() method available on req. This will push messages on to a stack that we can retrieve and display later.

Let's replace all our error checking in our controller with flash messages for the CREATE route:

```javascript
// ask mongoose to save the data for us and wait for the response
  Post.create( req.body , function(err, post){
  
    // check for errors and store a flash message if there was a problem
    if(err) req.flash('error' , err.message);
  
    // redirect the user to a GET route. We'll go back to the INDEX.
   res.redirect("/");
  
});

```

We'll also need to display our messages somewhere. It would be nice to be able to see the messages no matter which page you end up on. So lets create a new partial and put it in the layout:

```bash
touch views/partials/messages.ejs
```

Add the following to messages.ejs to display the errors:

```html
<div id="messages">
    <%= errors %>
</div>
```

And include the partial in the layout.ejs:

```html
<body>
  
   <% include partials/navigation  %>
   <% include partials/messages %>
   
...   
```

Now we'll need that "errors" variable in every template. Rather than do this in every controller ( which would be a pain ) we can set a variable that is available in every template using some middleware and res.locals. 

Add the following to your app.js ***after*** the flash middleware:

```javascript
// middleware to make flash messages available in every template
app.use(function(req, res, next){
    // res.locals will be available in every template
    res.locals.errors = req.flash('error');
    console.log(res.locals.errors);
    next();
});
```

## Authentication

### Model

In the command line:

```bash
touch models/user.js
```

Add the following to user.js:

```javascsript
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

  first_name : {type: String, required:true},
  last_name : {type: String, required:true},
  email : {type: String, required:true},
  password : {type: String, required:true}

});

module.exports = mongoose.model('User' , UserSchema);
```

### Views

The form view is actually a bit simpler for registration.

In the terminal:

```bash
mkdir views/users
touch views/users/new.ejs
touch views/users/form.ejs
```

In new.ejs:

```html
<h1>Register</h1>
<% include form %>
```

In the form.ejs:

```html
<form action="/users" method="POST">
	<div>
		<label>First Name</label>
		<input type="text" name="first_name">
	</div>
	<div>
		<label>Last Name</label>
		<input type="text" name="last_name">
	</div>
	<div>
		<label>Email</label>
		<input type="text" name="email">
	</div>
	<div>
		<label>Password</label>
		<input type="password" name="password">
	</div>
	
	<input type="submit" value="Register">
</form>
``` 

### Controller

In the terminal:

```bash
touch controllers/users.js
```

In the users.js controller:

```javascript
// NEW - GET /new
function newUser(req , res) {

  // create an empty user
  var newUser = {
    id: "",
    title: "",
    body: ""
  }

  res.render("posts/new" , {
    title: "Register",
    user: newUser
  });
}

// CREATE - POST /
function createUser(req , res) {

  // data is gathered by body parser and placed in req.body

  // ask mongoose to save the data for us and wait for the response
  User.create( req.body , function(err, post){
  
    // check for errors and return 500 if there was a problem
    if(err) req.flash('error' , err.message);
  
    // redirect the user to a GET route. We'll go back to the INDEX.
   res.redirect("/");
  
  });
}

// export all our controller functions in an object
module.exports = {

  new: newUser,
  create: createUser

}
```

### Routes

We only need two of our seven RESTful routes for this. NEW and CREATE. Let's add them to the config.js. Make sure you add these routes ***before*** your posts routes as they are more specific and so could be overriden by the more general routes for posts. We want them checked first:


```javascript
var usersController = require('../controllers/users');

...

// users
router.route('/users')
      .post(usersController.create);

router.route('/users/new')
      .get(usersController.new);
```

### Sessions

We need a login form. The login form is basically just a NEW form as it's used to create a session. It needs an email field and a password field:

```bash
mkdir views/sessions
touch views/sessions/new.ejs
touch views/sessions/form.ejs
```
In the new.ejs

```html
<h1>Login</h1>

<% include form.ejs %>
```

And in the form.ejs

```html
<form action="/sessions" method="POST">

  <div>
    <label>Email</label>
    <input type="email" name="email">
  </div>

  <div>
    <label>Password</label>
    <input type="password" name="password">
  </div>

  <input type="submit" value="login">

</form>
```

### Controller

In the terminal:

```bash
touch controllers/sessions.js
```

In the sessions.js file:

```javascript
var User = require('../models/user');


// NEW ( AKA Login )
function newSession(req,res) {

  res.render('sessions/new' , {title:"Login"});

}

// CREATE - Handles logins
function createSession(req,res){

  // look up the user with the details from the form
  User.findOne({email: req.body.email} , function(err, user){

      // did we find a user and does the password match
      if(user && user.password == req.body.password) {

        // save the user to the session ( log them in )
        req.session.user = user.id;

        res.redirect("/");

      } else {

        // add any other errors too
        if(err) req.flash('error' , err.message);

        // set the not found error
        req.flash('error' , "Email or password was incorrect");

        // redirect with error back to the login form
        res.redirect("/sessions/new");

      } 


  });

}

// DELETE - handle logouts
function deleteSession(req,res) {

    // clear the user from the session and redirect
    delete req.session.user;

    // redirect to login page
    res.redirect("/sessions/new");

}

module.exports = {
  new: newSession,
  create: createSession,
  delete: deleteSession
}
```

### Routes

Now let's add all the routes we need to the routes.js file. Again make sure they come ***before*** your posts routes:

```javascript
// sessions
router.route('/sessions')
      .post(sessionsController.create)
      .delete(sessionsController.delete);

router.route('/sessions/new')
      .get(sessionsController.new);
```

Notice that we've moved the delete function to the "/sessions" path. This is because we only have one session that we can delete. So we don't need an ID to identify one like we do with posts.

### Add the user to the req object

We have our user's ID saved in the session now. We can use that ID to load the user from the database with every request so that we can use it in our controllers. Let's write some middleware to do that.

In the app.js add the following ***after*** your session middleware:

```javascript
var User = require('./models/user');

...

// load logged in user
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
```

The script checks the session for a user id. If it finds one it loads that user from the database and adds the object to the request object and also globally to the templates with res.locals.


### Navigation

Let's change our navigation so we can login, logout and see the currently logged in user. We can use our user object in the template to say hello too.

Open the navigation.ejs and change it to the following:

```html
<nav>
  <% if(user) { %>
    <a href="/">Posts</a>
    <a href="/new">New Post</a>
    <form action="/sessions" method="POST">
      <input type="hidden" name="_method" value="delete">
      <input type="submit" value="Logout">
    </form>
    <p>Welcome, <%= user.first_name %></p>
  <% } else { %>
    <a href="/sessions/new">Login</a>
    <a href="/users/register">Register</a>
  <% } %>
</nav>
```

We are checking for user and changing the navigation based on the logged in state of the user.

### Checking for logins

Checking to see if a user is logged should now be as easy as checking to see if req.user is set.

Add the following to the app.js just before the routes are used:

```javascript
// check for login on all routes except sessions
app.use(function(req, res, next) {
  var urls = ["/sessions/new", "/users/new", "/sessions", "/users"];
  if(urls.indexOf(req.url) === -1) {
    if (!req.user) return res.redirect('/sessions/new')