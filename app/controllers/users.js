var mongoose = require( 'mongoose' );
var User = require( '../models/user.js' );

/*
// ====== Generic error handler used by all endpoints. ======
function handleError( res, code, reason, content ) {
	console.log( 'ERROR: ' + reason );
	res.status( code ).json( { message: content } );
};
*/


module.exports.findAllUsers = function( req, res ) {
	
	User.find({}, 'username', function( err,users ) {
		if( err ){
			//handleError( res, 500, err.message, "Failed to find all users." );
			res.status( 500 ).json( { message: "Failed to find all users." } );
		}
		else{
			//sendResponse( res, 200, users );
			res.status( 200 ).json( users );
		}
	});
	
};

module.exports.findUser = function( req, res ) {
	
	if ( !req.payload._id ){
		//handleError( res, 401, "No payload in request.", "Unauthorised access." );
		res.status( 401 ).json( { message: "Unauthorised access." } );
	}
	else{
		User.findById( req.payload._id , function( err,users ) {
			if( err ){
				//handleError( res, 500, err.message, "Failed to find user." );
				res.status( 500 ).json( { message: "Failed to find user." } );
			}
			else{
				//sendResponse( res, 200, users );
				res.status( 200 ).json( users );
			}
	
		});
	}
};

module.exports.updateUser = function( req, res ) {
	
	var newPassword = req.body.password;
	var newEmail = req.body.email;
	var update = { password:newPassword, email:newEmail, updated_at:Date.now() };
	
	if ( !req.payload._id ){
		//handleError( res, 401, "No payload in request.", "Unauthorised access." );
		res.status( 401 ).json( { message: "Unauthorised access." } );
	}
	else{
		User.findByIdAndUpdate( req.payload._id, update, function( err,users ) {
			if( err ){
				//handleError( res, 500, err.message, "Failed to update user." );
				res.status( 500 ).json( { message: "Failed to update user." } );
			}
			else{
				//sendResponse( res, 204, null );
				res.status( 204 ).end();
			}
	
		});
	}
};

module.exports.deleteUser = function( req, res ) {
	
	if ( !req.payload._id ){
		//handleError( res, 401, "No payload in request.", "Unauthorised access." );
		res.status( 401 ).json( { message: "Unauthorised access." } );
	}
	else{
		User.findByIdAndRemove( req.payload._id , function( err,users ) {
			if( err ){
				//handleError( res, 500, err.message, "Failed to delete user." );
				res.status( 500 ).json( { message: "Failed to delete users." } );
			}
			else{
				res.status( 204 ).end();
			}
	
		});
	}
};