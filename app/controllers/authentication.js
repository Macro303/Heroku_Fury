var mongoose = require( 'mongoose' );
var passport = require( 'passport' );
var User = require( '../models/user.js' );

/*
// ====== Generic error handler used by all endpoints. ======
function handleError( res, code, reason, content ) {
	console.log( "ERROR: " + reason );
	res.status( code ).json( message: content );
};
*/
module.exports.register = function( req, res ) {

	if ( !req.body.username || !req.body.email || !req.body.password ){
		//handleError( res, 400, "User info not supplied.", "All fields required." );
		res.status( 400 ).json( { message: "All fields required." } );
	}
	else{
	
		var newUsername = req.body.username;
		var newAdminFlag = req.body.admin;
		var newEmail = req.body.email;
	
		var user = new User({
			username: newUsername,
			email: newEmail,
			admin: newAdminFlag
		});
	
		user.setPassword( req.body.password );
	
		user.save( function( err ) {
			if( err ){
				if( err.code === 11000 || err.code === 11001 ){
					//handleError( res, 400, err.message, "User already exists." );
					res.status( 400 ).json( err );
				}
				else{
					//handleError( res, 500, err.message, "Failed to create new user." );
					res.status( 500 ).json( err );
				}
			}
			else{
				res.status( 204 ).end();
			}
		});
	}
	
};

module.exports.login = function( req, res ) {
	 
	if ( !req.body.username || !req.body.password ){
		//handleError( res, 400, "User info not supplied.", "All fields required." );
		res.status( 400 ).json( { message: "All fields required." } );
	}
	else{
		passport.authenticate( 'local', function( err, user ){
			var token;
		
			if( err ){
				//handleError( res, 500 , err.message, "Failed to complete authentication." );
				res.status( 500 ).json( err );
			}
		
			if( user ){
				token = user.generateJwt();
				res.status( 200 ).json( { "token": token } );
			}
			else{
				//handleError( res, 401, "User not found.", "Authentication Failed." );
				res.status( 400 ).json( { message: "Authentication Failed." } );
			}
		})( req,res );
	}
};