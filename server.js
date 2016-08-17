// server.js

// Initialize
//=============================================================================================

// Package calls
var express = require( "express" );
var bodyParser = require( "body-parser" );
var mongoose = require("mongoose");
var app = express();


app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// Set up the port for listening
var port = process.env.PORT || 8080;

// Initialise MLabs DB connect string
var uristring = process.env.MONGODB_URI;

// Database set-up
mongoose.connect( uristring, function( error, response ) {
	if( error ){
		console.log( 'ERROR connecting to DB. ' + error );
	}
	else{
		console.log( 'SUCCESS connected to DB' );
	}
});

// Get an instance of the Express Router
var router = express.Router();

/* Not used yet
// Generic error handler used by all endpoints.
function handleError( res, reason, message, code ) {
  console.log( "ERROR: " + reason );
  res.status( code || 500 ).json( { "error": message } );
}
*/
// Schema models
var User = require('./app/models/user.js');

// API routes
//=============================================================================================

// End-point for all routes
router.use( function( request, response, next ) {
	console.log('Loading........');
	next();
});

// TEST API ROUTE
router.get( '/', function(request, response ) {
	// Test connection message
	console.log('Testing API');
	response.json( { 'message' :'Howdy pardner, Test sucessful! Good job pal!' } );
	// Test connection message ended
});

// USER API ROUTES
//=============================================================================================

// *****Main Route for /users*****
router.route('/users')

// get all users
.get( function( request, response ) {
	console.log('Get all users invoked');
	
	User.find({}, function( err,users ) {
		if( err )
			response.send( err );
		
		response.json( users );
	});
})

// create a user
.post( function( request, response ) {

	console.log('Create a user invoked');
	
	var newUsername = request.body.username;
	var newName = request.body.name;
	var newPassword = request.body.password;
	
	// creating a test user
	var newUser = new User({
		username: newUsername,
		name: newName,
		password: newPassword
	});
	
	// save user to db
	newUser.save( function( err ) {
		if (err)
			response.send( error )
	
	response.json( newUser );
	});
	
});

// *****Main Route for /users:username******
router.route('/users/:username')

// get a user for username
.get( function( request, response ) {
	
	console.log('Get a user for username invoked');
	var usernameParams = request.params.username;
	
	User.find({ username: usernameParams }, function( err, user ) {
		if ( err )
			response.send( err );
		
		response.json( user );
	});
})

// update a user for username
.put( function( request, response ) {
	// Test function
	console.log('Update a user for username invoked');
	
	var usernameParams = request.params.username;
	var newPassword = request.body.newPassword;
	
	User.findOneAndUpdate({ username:usernameParams }, { password:newPassword }, function( err, user ) {
		if ( err )
			response.send( err );
		
		response.json( user );
	});
})

// delete a user for username
.delete( function( request, response ) {
	
	console.log('Delete a user for username invoked');
	var usernameParams = request.params.username;
	
	User.findOneAndRemove({ username: usernameParams }, function( err ) {
		if ( err )
			response.send( err );
		
		response.json( { 'user':usernameParams, 'message':'successfully deleted' } );
	});
});


//=============================================================================================

// Sets prefix for all routes
app.use( '/api', router );

// Sets the port to listen on
app.listen( port );
console.log( 'App now running on port' + port );