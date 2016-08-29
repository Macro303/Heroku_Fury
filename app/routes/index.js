// app/routes/index.js
// Holds all of the routes for the Fury Web service

var express = require( 'express' );
var jwt = require( 'express-jwt' );
var SECRET = process.env.SECRET;

var router = express.Router();

var auth = jwt({
	secret: SECRET,
	userProperty: 'payload'
});

// Initialise Controllers
var cntrlrAuth = require( '../controllers/authentication.js' );
var cntrlrUsers = require( '../controllers/users.js' );
var cntrlrProjects = require( '../controllers/projects.js' );


// ======= User Route API (/users) =======

// user login
router.post( '/login', cntrlrAuth.login );

// user registration / create a user
router.post( '/register', cntrlrAuth.register );

// get all users
router.get( '/users', auth, cntrlrUsers.findAllUsers );

// get a user
router.post( '/users', auth, cntrlrUsers.findUser );

// update a user
router.put( '/users', auth, cntrlrUsers.updateUser );

// delete a user
router.delete( '/users', auth, cntrlrUsers.deleteUser );

// ======= Project Route API (/projects) =======

// create a project
router.post( '/projects', auth, cntrlrProjects.createProject );

// get all projects user attached to
router.get( '/projects', auth, cntrlrProjects.findAllProjects );

// get a specific project
router.get( '/projects/:project', auth, cntrlrProjects.findProject );

// update a project
router.put( '/projects/:project', auth, cntrlrProjects.updateProject );

// delete a project
router.delete( '/projects/:project', auth, cntrlrProjects.deleteProject );

// ======= Router export =======
module.exports = router;