// passport.js

var mongoose = require( 'mongoose' );
var passport = require( 'passport' );
var LocalStrategy = require( 'passport-local' ).Strategy;
var User = require('../models/user.js');

passport.use( new LocalStrategy( function( username, password, done ){
	
	User.findOne({ username:username }, function( err, user ){
		if( err )
			return done( err );

		if( !user )
			return done( null, false, { message: 'User not found' } );
		
		if( !user.validPassword( password ) )
			return done( null, false, { message: 'Password not matched' } );

		return done( null, user );
	});
}));
	