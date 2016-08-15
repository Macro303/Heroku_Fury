// server.js

// Initialize
//=============================================================================================

// Package calls
var express = require( "express" );
var bodyParser = require( "body-parser" );

// Express Definition
var app = express();

//app.use( express.static(_dirname + "/public" ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// Set up the port for listening
var port = process.env.PORT || 8080;
var router = express.Router();


// Generic error handler used by all endpoints.
function handleError( res, reason, message, code ) {
  console.log( "ERROR: " + reason );
  res.status( code || 500).json( { "error": message } );
}
// API routes
//=============================================================================================


router.use( function( request, response, next ) {
	console.log('Loading........');
	next();
});

// TEST API ROUTE
router.get( '/', function(request, response ) {
	response.json( { 'message' :'Howdy pardner, Test sucessful! Good job pal!' } );
});

// USER API ROUTES
//=============================================================================================
router.route('/users')

.get( function( request, response ) {
	response.json( { 'First-name' :'Jimmy', 'Last-name':'Carter' } );
});


//=============================================================================================

app.use( '/api', router );

// Sets the port to listen on
app.listen( port );
console.log( 'App now running on port' + port );