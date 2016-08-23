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
	
	if (!request.payload._id){
		sendErrorResponse( response, 401, "No payload in request.", "Unauthorised access." );
	}
	else{
		User.find({}, function( err,users ) {
			if( err ){
				sendErrorResponse( response, 500, err.message, "Failed to get all contacts." );
			}
			else{
				sendResponse( response, 200, users );
			}
	
		});
	}
};