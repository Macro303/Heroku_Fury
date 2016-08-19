// server.js

// ====================
// Initialize =========
//=====================


// Package calls ======
var express = require( "express" );
var bodyParser = require( "body-parser" );
var mongoose = require("mongoose");
var app = express();

// Authentication packages ======
var jwt = require("jsonwebtoken");
var config = require('./config');

// Setup for bodyParser ======
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

app.set('secretSquirrel', config.secret);

// Set up the port for listening ======
var port = process.env.PORT || 8080;

// Initialise MLabs DB connect string ======
var uristring = process.env.MONGODB_URI;

// Database set-up ======
mongoose.connect( uristring, function( error, response ) {
	if( error ){
		console.log( 'ERROR connecting to DB. ' + error );
	}
	else{
		console.log( 'SUCCESS connected to DB' );
	}
});

// Get an instance of the Express Router ======
var router = express.Router();

// Generic error handler used by all endpoints. ======
function handleError( response, reason, message, code ) {
  console.log( "ERROR: " + reason );
  response.status( code || 500 ).json( { "error": message } );
}

// Schema models ======
var User = require('./app/models/user.js');


//=====================
// API routes =========
//=====================

// End-point for all routes ======
router.use( function( request, response, next ) {
	console.log('Loading........');
	next();
});

// TEST API ROUTE =======
router.get( '/', function(request, response ) {
	// Test connection message
	console.log('Testing API');
	response.json( { 'message' :'Howdy pardner, Test sucessful! Good job pal!' } );
	// Test connection message ended
});

// AUTHENTICATION API ROUTES ======

// *****Main route for authentication*****
router.route('/authentication')
.post( function( request, response ) {
	
	var query = { user: request.body.username};
	
	User.findOne( query, function( err,user ){
		if( err ){
			handleError( response, err.message, "Failed to complete authentication." );
		}
		else{
			if( !user ){
				handleError( response, err.message, "Authentication Failed." );
			}
			else {
				if( user.password != request.body.password ){
					handleError( response, err.message, "Authentication Failed." );
				}
				else{
					var token = jwt.sign( user, app.get('secretSquirrel'), { expiresInMinutes:1440 } );
					
					response.json({
						success:true,
						token:token
					});
				}
			}
		}
	)};
});

// USER API ROUTES
//=============================================================================================

// *****Main Route for /users*****
router.route('/users')

// get all users
.get( function( request, response ) {
	
	User.find({}, function( err,users ) {
		if( err ){
			handleError( response, err.message, "Failed to get all contacts." );
		}
		else{
			response.status(200).json( users );
		}
	});
})

// create a user
.post( function( request, response ) {

	var newUsername = request.body.username;
	var newPassword = request.body.password;
	var newAdminFlag = request.body.admin;
	var newEmail = request.body.email;
	
	var newUser = new User({
		username: newUsername,
		password: newPassword,
		email:newEmail,
		admin:newAdminFlag
	});
	
	newUser.save( function( err ) {
		if( err ){
			if( err.code == 11000 || err.code == 11001 ){
				handleError( response, err.message, "User already exists." );
			}
			else{
				handleError( response, err.message, "Failed to create new user." );
			}
		}
		else{
			response.status(204).end();
		}
	});
	
});

// *****Main Route for /users:username******
router.route('/users/:username')

// get a user for username
.get( function( request, response ) {
	
	var usernameParams = request.params.username;
	var query = { username: usernameParams };
	
	User.find( query, function( err, user ) {
		if( err ){
			handleError( response, err.message, "Failed to get the user." );
		}
		else{
			response.status(200).json( user );
		}
	});
})

// update a user for username
.put( function( request, response ) {
	
	var usernameParams = request.params.username;
	var newPassword = request.body.password;
	var newEmail = request.body.email;
	
	var query = { username:usernameParams };
	var newData = { password:newPassword, email:newEmail, updated_at:Date.now() };
	
	
	User.findOneAndUpdate( query, newData, function( err, user ) {
		if( err ){
			if( err.code == 11000 || err.code == 11001 ){
				handleError( response, err.message, "User already exists." );
			}
			else{
				handleError( response, err.message, "Failed to update user." );
			}
		}
		else{
			response.status(204).end();
		}
	});
})

// delete a user for username
.delete( function( request, response ) {
	
	var usernameParams = request.params.username;
	var query = { username:usernameParams };
	
	User.findOneAndRemove( query, function( err ) {
		if( err ){
			handleError( response, err.message, "Failed to delete a user." );
		}
		else{
			response.status(204).end();
		}
	});
});
//=============================================================================================

// Sets prefix for all routes
app.use( '/api', router );

// Sets the port to listen on
app.listen( port );
console.log( 'App now running on port' + port );