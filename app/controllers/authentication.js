var mongoose = require( 'mongoose' );
var passport = require( 'passport' );
var User = mongoose.model( 'User' );

// ====== Generic error handler used by all endpoints. ======
function sendErrorResponse( res, code, reason, content ) {
	console.log( "ERROR: " + reason );
	resp.status( code ).json( message: content );
}

// ====== Generic response used by all endpoints. ======
function sendResponse( res, code, content ) {
  
	if ( content ){
		res.status( code ).json( content );
	}
	else{
		res.status( code ).end();
	}
}

module.exports.register = function( req, res ) {

	if ( !req.body.username || !req.body.email || !req.body.admin )
		sendErrorResponse( res, 400, "User info not supplied.", "All fields required." );
	else{
	
		var newUsername = req.body.username;
		var newAdminFlag = req.body.admin;
		var newEmail = req.body.email;
	
		var newUser = new User({
			username: newUsername,
			email: newEmail,
			admin: newAdminFlag
		});
	
		newUser.setPassword( req.body.password );
	
		newUser.save( function( err ) {
			if( err ){
				if( err.code === 11000 || err.code === 11001 ){
					sendErrorResponse( res, 400, err.message, "User already exists." );
				}
				else{
					sendErrorResponse( res, 500, err.message, "Failed to create new user." );
				}
			}
			else{
				sendResponse( res, 204, null );
			}
		});
	}
	
};

module.exports.login = function( req, res ) {
	 
	if ( !req.body.username || !req.body.password )
		sendErrorResponse( res, 400, "User info not supplied.", "All fields required." );
	else{
		passport.authenticate( 'local', function( err, user ){
			var token;
		
			if( err ){
				sendErrorResponse( res, 500 , err.message, "Failed to complete authentication." );
			}
		
			if( user ){
				token = user.generateJwt();
				sendResponse( res, 200, { "token": token } );
			}
			else{
				sendErrorResponse( res, 401, "User not found.", "Authentication Failed." );
			}
		});
	}
};