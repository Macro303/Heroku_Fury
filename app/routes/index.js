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
var cntrlrTasks = require( '../controllers/tasks.js' );


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

// ======= Tasks Route API (/projects) =======

// create a project
router.post( '/tasks', auth, cntrlrProjects.createTask );

// get all projects user attached to
router.get( '/tasks', auth, cntrlrProjects.findAllTasks );

// get a specific project
router.get( '/tasks/:task', auth, cntrlrProjects.findTask );

// update a project
router.put( '/tasks/:task', auth, cntrlrProjects.updateTask );

// delete a project
router.delete( '/tasks/:task', auth, cntrlrProjects.deleteTask );

// ======= Router export =======
module.exports = router;