var express = require( "express" );
var jwt = require("express-jwt");

var router = express.Router();

var auth = jwt({
	secret: 'SECRET',
	userProperty: 'payload'
});

var cntrlrAuth = require('../controllers/authentication.js');
var cntrlrUsers = require('../controllers/users.js');

// user login
router.post( '/login',cntrlrAuth.login );

// create new user
router.post( '/register',cntrlrAuth.register );

// get all users
router.get( '/users', auth, cntrlrUsers.findAllUsers );

// get a user
//router.get( '/users:username', auth, cntrlrUsers.findUser );

// update a user
//router.put( '/users:username', auth, cntrlrUsers.UpdateUser );

// update a user
//router.delete( '/users:username',  auth, cntrlrUsers.DeleteUser );

module.exports = router;