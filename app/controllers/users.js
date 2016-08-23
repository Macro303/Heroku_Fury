var mongoose = require("mongoose");
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

module.exports.findAllUsers = function( request, response ) {
	
	User.find({}, 'username', function( err,users ) {
		if( err ){
			sendErrorResponse( response, 500, err.message, "Failed to find all users." );
		}
		else{
			sendResponse( response, 200, users );
		}
	});
	
};

module.exports.findUser = function( request, response ) {
	
	if ( !request.payload._id ){
		sendErrorResponse( response, 401, "No payload in request.", "Unauthorised access." );
	}
	else{
		User.findById({ request.payload._id }, function( err,users ) {
			if( err ){
				sendErrorResponse( response, 500, err.message, "Failed to find user." );
			}
			else{
				sendResponse( response, 200, users );
			}
	
		});
	}
};

module.exports.updateUser = function( request, response ) {
	
	var newPassword = request.body.password;
	var newEmail = request.body.email;
	var newData = { password:newPassword, email:newEmail, updated_at:Date.now() };
	
	if ( !request.payload._id ){
		sendErrorResponse( response, 401, "No payload in request.", "Unauthorised access." );
	}
	else{
		User.findByIdAndUpdate( request.payload._id, newData, function( err,users ) {
			if( err ){
				sendErrorResponse( response, 500, err.message, "Failed to update user." );
			}
			else{
				sendResponse( response, 204, null );
			}
	
		});
	}
};

module.exports.deleteUser = function( request, response ) {
	
	if ( !request.payload._id ){
		sendErrorResponse( response, 401, "No payload in request.", "Unauthorised access." );
	}
	else{
		User.findByIdAndRemove( request.payload._id , function( err,users ) {
			if( err ){
				sendErrorResponse( response, 500, err.message, "Failed to delete user." );
			}
			else{
				sendResponse( response, 204, null );
			}
	
		});
	}
};