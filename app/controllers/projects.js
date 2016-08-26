// app/controllers/projects.js
// Controller for Project routes

var mongoose = require( 'mongoose' );
var Project = require( '../models/project.js' );

module.exports.createProject = function( req, res ) {
	
	if ( !req.payload._id ){
		res.status( 401 ).json({ message: "Unauthorised access." });
	}
	else{
		if ( !req.body.name ){
			res.status( 400 ).json({ message: "All fields required." });
		}
		else{
			var newName = req.body.name;
			var newDescription = req.body.description;
			var user = req.payload.username;
			
			var project = new Project({
				name: newName,
				description: newDescription,
				created_by: user
			});
			
			project.usersOnProject.push({ username:user });
			
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
					res.status( 204 ).end();
				}
			});
		}
	}
	
};

module.exports.findAllProjects = function( req, res ) {
	res.status( 200 ).json({ message:'Test findAllProjects route'});
};

module.exports.findProject = function( req, res ) {
	var projectParams = req.params.project;
	
	res.status( 200 ).json({ message:'Test findProject route for ' + projectParams });
};

module.exports.updateProject = function( req, res ) {
	var projectParams = req.params.project;
	
	res.status( 200 ).json({ message:'Test updateProject route for ' + projectParams });
};

module.exports.deleteProject = function( req, res ) {
	var projectParams = req.params.project;
	
	res.status( 200 ).json({ message:'Test deleteProject route for ' + projectParams });
};