// app/controllers/users.js
// Controller for users routes

var mongoose = require( 'mongoose' );
var User = require( '../models/user.js' );

module.exports.findAllUsers = function( req, res ) {
	
	User.find( {}, 'username', function( err, users ) {
		if( err ){
			res.status( 500 ).json({ message: "Server error." });
		}
		else{
			if( users ){
				res.status( 200 ).json( users );
			}
			else{
				res.status( 400 ).json({ message: "No matches found." });
			}	
		}
	});
};

module.exports.findUser = function( req, res ) {
	
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		User.findById( req.payload._id , 'username email', function( err, user ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( user ){
					res.status( 200 ).json( user );
				}
				else{
					res.status( 400 ).json({ message: "No matches found." });
				}	
			}
		});
	}
};

module.exports.updateUser = function( req, res ) {
	
	var newPassword = req.body.password;
	var newEmail = req.body.email;
	
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		User.findById( req.payload._id, function( err,user ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( user ){
					if( newEmail )
						user.email = newEmail;
					if( newPassword )
						user.setPassword( newPassword );
				
					user.updated_at = Date.now();
				
					user.save( function( err ) {
						if( err ){
							res.status( 500 ).json({ message: "Server error." });
						}
						else{
							res.status( 200 ).json({ message: "Update successful." });
						}	
					});
				}
				else{
					res.status( 400 ).json({ message: "No matches found." });
				}	
			}
		});
	}
};

module.exports.deleteUser = function( req, res ) {
	
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		User.findByIdAndRemove( req.payload._id , function( err, user ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( user ) {
					res.status( 200 ).json({ message: "Delete successful." });
				}
				else{
					res.status( 400 ).json({ message: "No matches found." });
				}
			}
		});
	}
};