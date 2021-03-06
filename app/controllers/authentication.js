// app/controllers/authentication.js
// Controller for authentication routes

var mongoose = require( 'mongoose' );
var passport = require( 'passport' );
var User = require( '../models/user.js' );

module.exports.register = function( req, res ) {

	if ( !req.body.username || !req.body.email || !req.body.password ){
		res.status( 400 ).json({ message: "All fields required." });
	}
	else{
		var user = new User({
			username: req.body.username,
			email: req.body.email,
			admin: req.body.admin
		});
	
		user.setPassword( req.body.password );
	
		user.save( function( err ) {
			if( err ){
				if( err.code === 11000 || err.code === 11001 ){
					res.status( 400 ).json({ message: "User already exists." });
				}
				else{
					res.status( 500 ).json({ message: "Server error." });
					console.error( new Error( err.message ) );
				}
			}
			else{
				res.status( 201 ).json({ message: "Registration Successful." });
			}
		});
	}
	
};

module.exports.login = function( req, res ) {
	 
	if ( !req.body.username || !req.body.password ){
		res.status( 400 ).json({ message: "All fields required." });
	}
	else{
		passport.authenticate( 'local', function( err, user ){
			var token;
		
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
				console.error( new Error( err.message ) );
			}
		
			if( user ){
				token = user.generateJwt();
				res.status( 200 ).json({ token: token });
			}
			else{
				res.status( 401 ).json({ message: "Authentication Failed." });
			}
		})( req,res );
	}
};