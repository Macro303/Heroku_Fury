// app/controllers/tasks.js
// Controller for Task routes

var mongoose = require( 'mongoose' );
var Task = require( '../models/task.js' );

module.exports.createTask = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		if ( !req.body.name || !req.params.project ){
			res.status( 400 ).json({ message: "All fields required." });
		}
		else{
			var task = new Task({
				name: req.body.name,
				description: req.body.description,
				projectParent: req.params.project
			});
			
			task.save( function( err ){
				if( err ){
					res.status( 500 ).json({ message: "Server error." });
				}
				else{
					res.status( 201 ).json({ message: "Task creation successful." });
				}
			});
		}
	}
};

module.exports.findAllTasks = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		var query = { projectParent:req.params.project };
		
		Task.find( query, 'name description userAssigned projectParent priority columnIn', function( err, tasks ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( tasks ) {
					res.status( 200 ).json( tasks );	
				}
				else{
					res.status( 400 ).json({ message: "No matches found." });
				}	
			}
		});
	}
};

module.exports.findTask = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		var query = { _id:req.params.task };
		
		Task.find( query, 'name description userAssigned projectParent priority columnIn', function( err, task ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( task ) {
					res.status( 200 ).json( task );	
				}
				else{
					res.status( 400 ).json({ message: "No matches found." });
				}	
			}
		});
	}
};

module.exports.updateTask = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		res.status( 200 ).json({ message: "Task update successful." });
	}
};

module.exports.deleteTask = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		res.status( 200 ).json({ message: "Task delete successful." });
	}
};
