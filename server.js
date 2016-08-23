// server.js


// ===============================================================
// ====================== Initialization =========================
// ===============================================================

// ====== Package calls ======
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var passport = require( 'passport' );

//require( './app/models/db.js' );

var uristring = process.env.MONGODB_URI;

require( '.app/models/user.js' );

var gentleShutdown;


mongoose.connect( uristring, function( err, res ) {
	if( err ){
		console.log( 'ERROR connecting to ' + uristring + ' ' + err );
	}
	else{
		console.log( 'SUCCESS connected to ' + uristring );
	}
});

gentleShutdown = function( msg, callback ){
	mongoose.connection.close( function{
		console.log( 'Mongoose disconnected through ' + msg );
		callback();
	});
};

process.on( 'SIGINT', function(){
	gentleShutdown( 'App termination', function(){
		process.exit( 0 );
	});
});

process.on( 'SIGTERM', function(){
	gentleShutdown( 'Heroku app termination', function(){
		process.exit( 0 );
	});
});

//require( './app/config/passport.js' );

var LocalStrategy = require( 'passport-local' ).Strategy;
var User = mongoose.model( 'User' );

passport.use( new LocalStrategy( function( username, password, done ){
	
	User.findOne({ username:username }, function( err, user ){
		if( err )
			return done( err );

		if( !user )
			return done( null, false, { message: 'User not found' } );
		
		if( !user.verifyPassword( password ) )
			return done( null, false, { message: 'Password not matched' } );

		return done( null, user );
	});
}));
	


// ====== Initialise Express ======
var app = express();
var router = require( './app/routes/index.js' );

// ===============================================================
// =================== App Initialization ========================
// ===============================================================

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

app.use( passport.initialise() );
app.use( '/api', router );


// Error handlers
app.use( function( req, res, next ){
	var err = new Error( 'Not found' );
	err.status = 404;
	next( err );
});

app.use( function( err, req, res, next ){
	if( err.name === 'UnauthorizedError' ){
		res.status( 401 ).json( { message: "Unauthorised Access" } );
	}
	else{
		res.status( err.status || 500 ).json( { message: err.message } );
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