var mongoose = require("mongoose");
var passport = require("passport");
var User = mongoose.model("User");

// ====== Generic error handler used by all endpoints. ======
function sendErrorResponse( response, code, reason, content ) {
	console.log( "ERROR: " + reason );
	response.status( code ).json( message: content );
}

// ====== Generic response used by all endpoints. ======
function sendResponse( response, code, content ) {
  
	if ( content ){
		response.status( code ).json( content );
	}
	else{
		response.status( code ).end();
	}
}

module.exports.register = function( request, response ) {

	if ( !request.body.username || !request.body.email || !request.body.admin )
		sendErrorResponse( response, 400, "User info not supplied.", "All fields required." );
	else{
	
		var newUsername = request.body.username;
		var newAdminFlag = request.body.admin;
		var newEmail = request.body.email;
	
		var newUser = new User({
			username: newUsername,
			email: newEmail,
			admin: newAdminFlag
		});
	
		newUser.setPassword( request.body.password );
	
		newUser.save( function( err ) {
			if( err ){
				if( err.code == 11000 || err.code == 11001 ){
					sendErrorResponse( response, 400, err.message, "User already exists." );
				}
				else{
					sendErrorResponse( response, 500, err.message, "Failed to create new user." );
				}
			}
			else{
				sendResponse( response, 204, null );
			}
		});
	}
	
};

module.exports.login = function( request, response ) {
	 
	if ( !request.body.username || !request.body.password )
		sendErrorResponse( response, 400, "User info not supplied.", "All fields required." );
	else{
		var loginUsername = request.body.username;
		var loginPassword = request.body.password;
		var query = { username:loginUsername };
	
		passport.authenticate( 'local', function( err, user ){
			var token;
		
			if( err ){
				sendErrorResponse( response, 500 , err.message, "Failed to complete authentication." );
			}
		
			if( user ){
				token = user.generateJwt();
				sendResponse( response, 200, { "token": token } );
			}
			else{
				sendErrorResponse( response, 401, "User not found.", "Authentication Failed." );
			}
		} )(request, response);
	}
};