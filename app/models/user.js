// app/models/user.js

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

module.exports = mongoose.model( 'User', new Schema({
	username: String,
	firstName: String,
	lastName: String,
	password: String,
	admin: Boolean
}));