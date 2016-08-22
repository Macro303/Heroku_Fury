// server.js


// ===============================================================
// ====================== Initialization =========================
// ===============================================================

// ====== Package calls ======
var express = require( "express" );
var bodyParser = require( "body-parser" );
var mongoose = require("mongoose");
var passport = require("passport");
var User = mongoose.model("User");

// ====== Initialise Express ======
var app = express();

// ====== Get an instance of the Express Router ======
var router = express.Router();

require('./config.js');

// ====== Setup for bodyParser ======
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// ====== Sets prefix for all routes ======
app.use( passport.initialise() );
app.use( '/api', router );


// ====== Set up the port for listening ======
var port = process.env.PORT || 8080;


// ====== Database set-up ======
var uristring = process.env.MONGODB_URI;

mongoose.connect( uristring, function( error, response ) {
	if( error ){
		console.log( 'ERROR connecting to DB. ' + error );
	}
	else{
		console.log( 'SUCCESS connected to DB' );
	}
});

// ====== Generic error handler used by all endpoints. ======
function handleError( response, reason, message, code ) {
  console.log( "ERROR: " + reason );
  response.status( code || 500 ).json( { "error": message } );
}

// ====== Schema models ======
//var User = require('./app/models/user.js');





//===============================================================
//====================== API routes =============================
//===============================================================

// ====== End-point for all routes ======
router.use( function( request, response, next ) {
	console.log('Loading........');
	next();
});

// ====== TEST API ROUTE =======
router.get( '/', function(request, response ) {
	// Test connection message
	console.log('Testing API');
	response.json( { 'message' :'Howdy pardner, Test sucessful! Good job pal!' } );
	// Test connection message ended
});

// ====== AUTHENTICATION API ROUTE ======

router.post( '/login', function( request, response ) {
	 
	var loginUsername = request.body.username;
	var loginPassword = request.body.password;
	var query = { username:loginUsername };
	
	passport.authenticate( 'local', function( err, user ){
		var token;
		
		if( err ){
			handleError( response, err.message, "Failed to complete authentication." );
		}
		
		if( user ){
			token = user.generateJwt();
			response.status( 200 ).json( { "token": token } );
		}
		else{
			handleError( response, "User not found.", "Authentication Failed." );
		}
	} );

/*	
	User.find( query, function( err,user ){
		
		if( err ){
			handleError( response, err.message, "Failed to complete authentication." );
		}
		else{
			if( JSON.stringify(user.username) != loginUsername.toString().trim() ){
				handleError( response, "User not found.", "Authentication Failed." );
			}
			else {
				if( user.password != loginPassword ){
					handleError( response, "Password not matched.", "Authentication Failed." );
				}
				else{
					var token = jwt.sign( user, secret, { expiresIn:86400 });
					
					response.json({ 'success':true, 'token':token });
				}
			}
			
		}
	});*/
});

// ===============================================================
// ====================== User API routes ========================
// ===============================================================

// ====== Main Route for /users ======
router.route('/users')

// Get all users 
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

// Create a user 
.post( function( request, response ) {

	var newUsername = request.body.username;
	var newAdminFlag = request.body.admin;
	var newEmail = request.body.email;
	
	var newUser = new User({
		username: newUsername,
		email:newEmail,
		admin:newAdminFlag
	});
	
	newUser.setPassword( request.body.password );
	
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
			var token = newUser.generateJwt();
			response.status(201).json({ "token": token });
		}
	});
	
});

// ====== Main Route for /users:username ======
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

// ===============================================================
// =================== Final initialisation ======================
// ===============================================================

// Sets the port to listen on
app.listen( port );
console.log( 'App now running on port' + port );