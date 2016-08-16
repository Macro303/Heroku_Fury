// app/models/user.js

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

module.exports = mongoose.model( 'User', new Schema({
	username: String,
	name { 
		first: String,
		last: { type:String, trim:true }
	},
	password: String,
	admin: Boolean
}));