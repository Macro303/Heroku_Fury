// app/controllers/columns.js
// Controller for Column routes

var mongoose = require( 'mongoose' );
var Column = require( '../models/column.js' );
var Task = require( '../models/task.js' );

module.exports.createColumn = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		if ( !req.body.name || !req.params.project ){
			res.status( 400 ).json({ message: "All fields required." });
		}
		else{
			var column = new Column({
				name: req.body.name,
				projectParent: req.params.project
			});
			
			column.save( function( err ){
				if( err ){
					res.status( 500 ).json({ message: "Server error." });
				}
				else{
					res.status( 201 ).json({ message: "Column creation successful." });
				}
			});
		}
	}
};

module.exports.findAllProjectColumns = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		var query = { projectParent:req.params.project };
		
		Column.find( query, 'name projectParent', function( err, columns ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( columns ) {
					res.status( 200 ).json( columns );	
				}
				else{
					res.status( 400 ).json({ message: "No matches found." });
				}	
			}
		});
	}
};

module.exports.findColumn = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		Column.findById( req.params.column, 'name projectParent', function( err, column ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( column ) {
					res.status( 200 ).json( [ column ] );	
				}
				else{
					res.status( 400 ).json({ message: "No matches found." });
				}	
			}
		});
	}
};

module.exports.updateColumn = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{	
		Column.findById( req.params.column, function( err, column ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( column ) {
					if( req.body.name )
						column.name = req.body.name;
					
					column.updated_at = Date.now();
					
					column.save( function( err ) {
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

module.exports.deleteColumn = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		Column.findById( req.params.column, function( err, column ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( column ) {
					Task.update( { columnIn:column.name }, { columnIn:'New' }, { multi:true }, function( err ) {
						if( err ){
							res.status( 500 ).json({ message: "Server error." });
						}
						else{
							Column.findByIdAndRemove( req.params.column, function( err ) {
								if( err ){
									res.status( 500 ).json({ message: "Server error." });
								}
								else{
									res.status( 200 ).json({ message: "Delete successful." });
								}
								
							});
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