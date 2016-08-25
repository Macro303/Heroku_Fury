// app/controllers/projects.js
// Controller for Project routes

var mongoose = require( 'mongoose' );
var Project = require( '../models/project.js' );

module.exports.findAllProjects = function( req, res ) {
	res.status( 200 ).json( { message:'Test FindAllProjects route'} );
};

module.exports.findProject = function( req, res ) {
	res.status( 200 ).json( { message:'Test FindProjects route'} );
};

module.exports.updateProject = function( req, res ) {
	res.status( 200 ).json( { message:'Test UpdateProjects route'} );
};

module.exports.deleteProject = function( req, res ) {
	res.status( 200 ).json( { message:'Test DeleteProjects route'} );
};