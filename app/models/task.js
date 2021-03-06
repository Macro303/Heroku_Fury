// app/models/task.js
// Task schema for Fury Web Service

var mongoose = require( 'mongoose' );

var taskSchema = new mongoose.Schema({
	name: { type: String, required:true },
	description: { type:String, default:"" },
	userAssigned: { type:String, default:"" },
	projectParent: { type:String, required:true },
	priority: { type:String, default:"NORMAL" },
	columnIn: { type:String },
	created_at: { type:Date, default:Date.now },
	updated_at: { type:Date, default:Date.now }
});

module.exports = mongoose.model( 'Task', taskSchema );