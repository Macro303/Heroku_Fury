// app/models/project.js
// Project schema for Fury Web Service

var mongoose = require( 'mongoose' );

var projectSchema = new mongoose.Schema({
	name: { type: String, required:true, unique:true },
	description: { type:String }
});

module.exports = mongoose.model( 'Project', projectSchema );