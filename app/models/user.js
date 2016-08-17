// app/models/user.js

var mongoose = require( 'mongoose' );
/*
var userSchema = new mongoose.Schema({
	username: { type: String, required:true, unique:true },
	name: { 
		first: String,
		last: { type:String, trim:true }
	},
	password: { type:String, required:true },
	admin: Boolean
	created_at: Date,
	updated_at: Date
});
*/

var userSchema = new mongoose.Schema({
	username: String,
	name: String,
	password: String
});

module.exports = mongoose.model( 'Users', userSchema);