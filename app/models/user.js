// app/models/user.js

var mongoose = require( 'mongoose' );
var crypto = require( 'crypto' );
var jwt = require( 'jsonwebtoken' );

var userSchema = new mongoose.Schema({
	username: { type: String, required:true, unique:true },
	password: { type:String, required:true },
	admin: { type:Boolean, required:true, default:false },
	email:{ type:String, required:true },
	created_at: { type:Date, default:Date.now },
	hash: String,
	salt: String,
	updated_at: { type:Date, default:Date.now }
});

userSchema.methods.setPassword = function( password ){
	this.salt = crypto.randomBytes( 16 ).toString( 'hex' );
	this.hash = crypto.pbkdf2Sync( password, this.salt, 1000, 64 ).toString( 'hex' );
};

userSchema.methods.validPassword = function( password ){
	var hash = crypto.pbkdf2Sync( password, this.salt, 1000, 64 ).toString( 'hex' );
	return this.hash === hash;
}

userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate( expiry.getDate() + 7 );
	
	return jwt.sign( {
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt( expiry.getTime() / 1000 ),
	}, 'SECRET');
};

module.exports = mongoose.model( 'User', userSchema );