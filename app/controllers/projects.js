// app/controllers/projects.js
// Controller for Project routes

var mongoose = require( 'mongoose' );
var Project = require( '../models/project.js' );
var User = require( '../models/user.js' );
var Task = require( '../models/task.js' );

module.exports.createProject = function( req, res ) {
	
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		if ( !req.body.name ){
			res.status( 400 ).json({ message: "All fields required." });
		}
		else{
			var project = new Project({
				name: req.body.name,
				description: req.body.description,
				created_by: req.payload.username
			});
			
			project.usersOnProject.push( req.payload.username );
			
			project.save( function( err ) {
				if( err ){
					if( err.code === 11000 || err.code === 11001 ){
						res.status( 400 ).json({ message: "Project already exists." });
					}
					else{
						res.status( 500 ).json({ message: "Server error." });
					}
				}
				else{
					res.status( 201 ).json({ message: "Project creation successful." });
				}
			});
		}
	}
};

module.exports.findAllProjects = function( req, res ) {
	
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		var query = { usersOnProject:req.payload.username };
	
		Project.find( query, 'name description usersOnProject', function( err, projects ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( projects ) {
					res.status( 200 ).json( projects );	
				}
				else{
					res.status( 400 ).json({ message: "No matches found." });
				}
			}
		});
	}
};

module.exports.findProject = function( req, res ) {
	
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		Project.findById( req.params.project, 'name description usersOnProject', function( err,project ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
				console.log( { err } );
			}
			else{
				if( project ) {
					res.status( 200 ).json( [ project ] );	
				}
				else{
					res.status( 400 ).json({ message: "No matches found." });
				}
			}
		});
	}
};

module.exports.updateProject = function( req, res ) {
	var newDescription = req.body.description;
	var newUser = req.body.username;
	
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		Project.findById( req.params.project, function( err, project ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( project ) {
					if( newDescription ) 
						project.description = newDescription;
				
					if( newUser ){
						project.usersOnProject.push( newUser );
					}
			
					project.updated_at = Date.now();
				
					project.save( function( err ) {
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

module.exports.deleteProject = function( req, res ) {
	
	if ( !req.payload._id ){
		res.status( 401 ).json( { message: "Unauthorised access." } );
	}
	else{
		var query = req.params.project;
		var user = req.payload.username;
		
		Project.findById( query, function( err, project ) {
			if( err ){
				res.status( 500 ).json({ message: "Server error." });
			}
			else{
				if( project ){
					if( project.usersOnProject.length > 1 ){
						Project.findByIdAndUpdate( query, { $pull:{ usersOnProject:user } }, function( err ){
							if( err ){
								res.status( 500 ).json({ message: "Server error." });
							}
							else{
								res.status( 200 ).json({ message: "Delete successful." });
							}
						});
					}
					else{
						Task.remove( { projectParent:query }, function( err ){
							if( err ){
								res.status( 500 ).json({ message: "Server error." });
							}
							else{
								Project.findByIdAndRemove( query, function( err ){
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
				}
				else{
					res.status( 400 ).json({ message: "No matches found." });
				}
			}
		});
	}
};