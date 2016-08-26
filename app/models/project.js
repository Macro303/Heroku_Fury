// app/models/project.js
// Project schema for Fury Web Service

var mongoose = require( 'mongoose' );

var projectSchema = new mongoose.Schema({
	name: { type: String, required:true, unique:true },
	description: { type:String },
	usersOnProject: [ { 
		username: { type:String, required:true } 
		} ],
	created_by: { username:String },
	created_at: { type:Date, default:Date.now },
	updated_at: { type:Date, default:Date.now }
});

module.exports = mongoose.model( 'Project', projectSchema );