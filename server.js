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

/*
var userSchema = new mongoose.Schema({
	username: String,
	name: String,
	password: String
});

var User = mongoose.model( 'Users', userSchema );
*/


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
	// Test function
	console.log('Get all users invoked');
	response.json( { 'message':'get all users' } );
	// Test function ended
})

// create a user
.post( function( request, response ) {
	// Test function
	console.log('Create a user invoked');
	
	// creating a test user
	var newUser = new User({
		username: 'Starlord',
		name: 'Peter Quill',
		password: 'password',
	});
	
	// save user to db
	newUser.save( function( err ) {
		if (err){
			console.log('Error on save!')
		}
		else{
			console.log('User created!');
		}
	});
	
	response.json( { 'message':'user created' } );
	// Test function ended
});

// *****Main Route for /users:user_id******
router.route('/users/:user_id')

// get a user for user_id
.get( function( request, response ) {
	// Test function
	console.log('Get a user for user_id invoked');
	var userid = request.params.user_id;
	response.json( { 'userID': userid, 'first-name':'Seymour', 'last-name':'Butts' } );
	// Test function ended
})

// update a user for user_id
.put( function( request, response ) {
	// Test function
	console.log('Update a user for user_id invoked');
	response.json( { 'message':'update a user for user_id' } );
	// Test function ended
})

// delete a user for user_id
.delete( function( request, response ) {
	
	// Test function
	console.log('Delete a user for user_id invoked');
	User.findOneAndRemove({ username: 'Starlord'}, function( err ) {
		if (err){
			console.log('Error on delete!')
		}
		else{
			console.log('User deleted!');
		}
	});
	response.json( { 'message':'user deleted!' } );
	// Test function ended
});


//=============================================================================================

// Sets prefix for all routes
app.use( '/api', router );

// Sets the port to listen on
app.listen( port );
console.log( 'App now running on port' + port );