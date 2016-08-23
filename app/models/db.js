var mongoose = require("mongoose");
var uristring = process.env.MONGODB_URI;

var gentleShutdown;


mongoose.connect( uristring, function( error, response ) {
	if( error ){
		console.log( 'ERROR connecting to ' + uristring + ' ' + error );
	}
	else{
		console.log( 'SUCCESS connected to ' + uristring );
	}
});

gentleShutdown = function( mesg, callback ){
	mongoose.connection.close( function{
		console.log( 'Mongoose disconnected through ' + mesg );
		callback();
	});
	
};

process.on('SIGINT', function(){
	gentleShutdown( 'app termination', function(){
		process.exit(0);
	});
});

process.on('SIGTERM', function(){
	gentleShutdown( 'Heroku app termination', function(){
		process.exit(0);
	});
});

require('./user.js');