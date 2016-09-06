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
var cntrlrColumns = require( '../controllers/columns.js' );


// ======= User Route API =======

// user login / authentication
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

// ======= Project Route API  =======

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

// ======= Tasks Route API =======

// create a task
router.post( '/projects/:project/tasks', auth, cntrlrTasks.createTask );

// get all tasks attached to a project
router.get( '/projects/:project/tasks', auth, cntrlrTasks.findAllProjectTasks );

// get all tasks attached to a user
router.get( '/users/tasks', auth, cntrlrTasks.findAllUserTasks );

// get all tasks in a column
router.get( '/projects/:project/columns/:column/tasks', auth, cntrlrTasks.findAllColumnTasks );

// get a specific task
router.get( '/projects/:project/tasks/:task', auth, cntrlrTasks.findTask );

// update a task
router.put( '/projects/:project/tasks/:task', auth, cntrlrTasks.updateTask );

// delete a task
router.delete( '/projects/:project/tasks/:task', auth, cntrlrTasks.deleteTask );

// ======= Columns Route API =======

// create a column
router.post( '/projects/:project/columns', auth, cntrlrColumns.createColumn );

// get all columns attached to a project
router.get( '/projects/:project/columns', auth, cntrlrColumns.findAllProjectColumns );

// get a specific column
router.get( '/projects/:project/columns/:column', auth, cntrlrColumns.findColumn );

// update a column
router.put( '/projects/:project/columns/:column', auth, cntrlrColumns.updateColumn );

// delete a column
router.delete( '/projects/:project/columns/:column', auth, cntrlrColumns.deleteColumn );

// ======= Router export =======
module.exports = router;