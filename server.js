// server.js
// Main Server file for the Fury Web Service

// ===============================================================
// ====================== Package Initialization =================
// ===============================================================

// ====== Package calls ======
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var passport = require( 'passport' );
//var jwt = require( 'express-jwt' );

require( './app/models/db.js' );
require( './app/config/passport.js' );

// ===============================================================
// =================== App Initialization ========================
// ===============================================================

var app = express();

// ====== Initialise BodyParser ======
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// ====== Initialise Passport ======
app.use( passport.initialize() );

// ===============================================================
// =================== Final initialisation ======================
// ===============================================================

// ====== Initialise Routes ======
var router = require( './app/routes/index.js' );
app.use( '/api', router );


// ====== Initialise Error Handlers ======
app.use( function( req, res, next ){
	var err = new Error( 'Not found' );
	err.status = 404;
	next( err );
});

app.use( function( err, req, res, next ){
	if( err.name === 'UnauthorizedError' )
		res.status( 401 ).json( { message: "Unauthorised Access" } );
});

app.use( function( err, req, res, next ){
	res.status( err.status || 500 ).json( { message: err.message } );	
});

// ====== Set up the port for listening ======
var port = process.env.PORT || 8080;
app.listen( port );