// app/models/user.js

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

module.exports = mongoose.model( 'User', new Schema({
	username: { type: String, required:true, unique:true },
	name: { 
		first: String,
		last: { type:String, trim:true }
	},
	password: { type:String, required:true },
	admin: Boolean
	created_at: Date,
	updated_at: Date
}));