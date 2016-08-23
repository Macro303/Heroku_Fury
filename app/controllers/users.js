var mongoose = require( 'mongoose' );
var User = require( '../models/user.js' );


// ====== Generic error handler used by all endpoints. ======
function sendErrorResponse( res, code, reason, content ) {
	console.log( 'ERROR: ' + reason );
	res.status( code ).json( message: content );
};

// ====== Generic response used by all endpoints. ======
function sendResponse( res, code, content ) {
  
	if ( content ){
		res.status( code ).json( content );
	}
	else{
		res.status( code ).end();
	}
};

module.exports.findAllUsers = function( req, res ) {
	
	User.find({}, 'username', function( err,users ) {
		if( err ){
			sendErrorResponse( res, 500, err.message, "Failed to find all users." );
		}
		else{
			sendResponse( res, 200, users );
		}
	});
	
};

module.exports.findUser = function( req, res ) {
	
	if ( !req.payload._id ){
		sendErrorResponse( res, 401, "No payload in request.", "Unauthorised access." );
	}
	else{
		User.findById( req.payload._id , function( err,users ) {
			if( err ){
				sendErrorResponse( res, 500, err.message, "Failed to find user." );
			}
			else{
				sendResponse( res, 200, users );
			}
	
		});
	}
};

module.exports.updateUser = function( req, res ) {
	
	var newPassword = req.body.password;
	var newEmail = req.body.email;
	var update = { password:newPassword, email:newEmail, updated_at:Date.now() };
	
	if ( !req.payload._id ){
		sendErrorResponse( res, 401, "No payload in request.", "Unauthorised access." );
	}
	else{
		User.findByIdAndUpdate( req.payload._id, update, function( err,users ) {
			if( err ){
				sendErrorResponse( res, 500, err.message, "Failed to update user." );
			}
			else{
				sendResponse( res, 204, null );
			}
	
		});
	}
};

module.exports.deleteUser = function( req, res ) {
	
	if ( !req.payload._id ){
		sendErrorResponse( res, 401, "No payload in request.", "Unauthorised access." );
	}
	else{
		User.findByIdAndRemove( req.payload._id , function( err,users ) {
			if( err ){
				sendErrorResponse( res, 500, err.message, "Failed to delete user." );
			}
			else{
				sendResponse( res, 204, null );
			}
	
		});
	}
};