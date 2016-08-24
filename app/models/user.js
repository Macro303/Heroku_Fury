// app/models/user.js
// User schema for Fury Web Service

var mongoose = require( 'mongoose' );
var crypto = require( 'crypto' );
var jwt = require( 'jsonwebtoken' );
var SECRET = provess.env.SECRET;

var userSchema = new mongoose.Schema({
	username: { type: String, required:true, unique:true },
	admin: { type:Boolean, default:false },
	email:{ type:String, required:true },
	created_at: { type:Date, default:Date.now },
	hash: String,
	salt: String,
	updated_at: { type:Date, default:Date.now }
});

userSchema.methods.setPassword = function( password ){
	this.salt = crypto.randomBytes( 64 ).toString( 'hex' );
	this.hash = crypto.pbkdf2Sync( password, this.salt, 10000, 64, 'sha512').toString( 'hex' );
};

userSchema.methods.validPassword = function( password ){
	var hash = crypto.pbkdf2Sync( password, this.salt, 10000, 64, 'sha512').toString( 'hex' ); 
	return this.hash === hash;
	
}

userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate( expiry.getDate() + 7 );
	
	var token = {
		_id: this._id,
		username: this.username,
		exp: parseInt( expiry.getTime() / 1000 ),
	};
	
	return jwt.sign( token, SECRET );
};

module.exports = mongoose.model( 'User', userSchema );