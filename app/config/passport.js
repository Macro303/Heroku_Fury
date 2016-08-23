// config.js

var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = mongoose.model("User");

passport.use( new LocalStrategy( function( username, password, done ){
	
	User.find({ username:username }, function( err, user){
		if( err ){
			return done( err );
		}
		
		if( !user ){
			return done( null, false, { message: 'User not found' } );
		}
		
		if( !user.verifyPassword( password ) ){
			return done( null, false, { message: 'Password not matched' } );
		}
		return done( null, user );
	});
}));
	