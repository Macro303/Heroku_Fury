// app/controllers/projects.js
// Controller for Project routes

var mongoose = require( 'mongoose' );
var Project = require( '../models/project.js' );

module.exports.createProject = function( req, res ) {
	res.status( 200 ).json( { message:'Test createProject route'} );
};

module.exports.findAllProjects = function( req, res ) {
	res.status( 200 ).json( { message:'Test findAllProjects route'} );
};

module.exports.findProject = function( req, res ) {
	var projectParams = req.params.project;
	
	res.status( 200 ).json( { message:'Test findProject route for ' + projectParams } );
};

module.exports.updateProject = function( req, res ) {
	var projectParams = req.params.project;
	
	res.status( 200 ).json( { message:'Test updateProject route for ' + projectParams } );
};

module.exports.deleteProject = function( req, res ) {
	var projectParams = req.params.project;
	
	res.status( 200 ).json( { message:'Test deleteProject route for ' + projectParams } );
};