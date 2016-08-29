// app/models/task.js
// Task schema for Fury Web Service

var mongoose = require( 'mongoose' );

var taskSchema = new mongoose.Schema({
	name: { type: String, required:true },
	description: { type:String },
	userAssigned: { type:String },
	projectParent: { type:String, required:true },
	priority: { type:String },
	columnIn: { type:String, default:"new" },
	created_at: { type:Date, default:Date.now },
	updated_at: { type:Date, default:Date.now }
});

module.exports = mongoose.model( 'Task', taskSchema );