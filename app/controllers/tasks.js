// app/controllers/tasks.js
// Controller for Task routes

var mongoose = require( 'mongoose' );
var Task = require( '../models/task.js' );

module.exports.createTask = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		if ( !req.body.name || !req.body.project ){
			res.status( 400 ).json({ message: "All fields required." });
		}
		else{
			//var taskName = req.body.name;
			//var taskDescription = req.body.description;
			//var projectName = req.body.project;
			
			var task = new Task({
				name: req.body.name,
				description: req.body.description;,
				projectParent: req.body.project
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
		res.status( 200 ).json({ message: "Tasks find successful." });
	}
};

module.exports.findTask = function( req, res ){
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		res.status( 200 ).json({ message: "Single Task find successful." });
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
