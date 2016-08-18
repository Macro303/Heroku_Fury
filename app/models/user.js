// app/models/user.js

var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({
	username: { type: String, required:true, unique:true },
	password: { type:String, required:true },
	admin: { type:Boolean, required:true },
	email:{ type:String, required:true },
	created_at: { type:Date, default:Date.now },
	updated_at: { type:Date, default:Date.now }
});

/*
var userSchema = new mongoose.Schema({
	username: String,
	name: String,
	password: String
});
*/

module.exports = mongoose.model( 'Users', userSchema);