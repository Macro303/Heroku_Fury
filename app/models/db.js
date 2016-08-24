var mongoose = require( 'mongoose' );
var uristring = process.env.MONGODB_URI;
require( './user.js' );

mongoose.connect( uristring, function( err, res ) {
	if( err ){
		console.log( 'ERROR connecting to ' + uristring + ' ' + err );
	}
	else{
		console.log( 'SUCCESS connected to ' + uristring );
	}
});

var gentleShutdown = function( msg, callback ){
	mongoose.connection.close( function() {
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

