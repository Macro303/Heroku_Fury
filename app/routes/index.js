var express = require( "express" );
var jwt = require("express-jwt");

var router = express.Router();

var auth = jwt({
	secret: "SECRET",
	userProperty: 'payload'
});

var cntrlrAuth = require('../controllers/authentication.js');
var cntrlrUsers = require('../controllers/users.js');

// user login
router.post( '/login', cntrlrAuth.login );

// create new user
router.post( '/register', cntrlrAuth.register );

// get all users
router.get( '/users', auth, cntrlrUsers.findAllUsers );

// get a user
router.post( '/users', auth, cntrlrUsers.findUser );

// update a user
router.put( '/users', auth, cntrlrUsers.updateUser );

// update a user
router.delete( '/users', auth, cntrlrUsers.deleteUser );

module.exports = router;