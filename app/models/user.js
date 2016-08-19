// app/models/user.js

var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({
	username: { type: String, required:true, unique:true },
	password: { type:String, required:true },
	admin: { type:Boolean, required:true, default:false },
	email:{ type:String, required:true },
	created_at: { type:Date, default:Date.now },
	updated_at: { type:Date, default:Date.now }
});

module.exports = mongoose.model( 'Users', userSchema);