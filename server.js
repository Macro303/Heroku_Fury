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

require('./app/models/db.js');

require('./app/config/passport.js');


// ====== Initialise Express ======
var app = express();
var router = require('./app/routes/index.js');

// ===============================================================
// =================== App Initialization ========================
// ===============================================================

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

app.use( passport.initialise() );
app.use( '/api', router );


// Error handlers
app.use( function( request, response, next ){
	var err = new Error( 'Not found' );
	err.status = 404;
	next( err );
});

app.use( function( err, request, response, next ){
	if( err.name === 'UnauthorizedError' ){
		response.status( 401 ).json( message: "Unauthorised Access" );
	}
	else{
		response.status( err.status || 500 ).json( message: err.message );
	}
		
});


// ===============================================================
// =================== Final initialisation ======================
// ===============================================================

// ====== Set up the port for listening ======
var port = process.env.PORT || 8080;

// Sets the port to listen on
app.listen( port );
console.log( 'Server now running on port' + port );