// server.js

// Initialize
//=============================================================================================

// Package calls
var express = require( "express" );
var path = require( "path" );
var bodyParser = require( "body-parser" );
var mongodb = require( "mongodb" );
var ObjectID = mongodb.ObjectID;

// Express Definition
var app = express();

app.use(express.static(_dirname + "/public"));
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

var router = express.Router();
app.use( '/api', router );

  // Initialize the server.
  var server = app.listen( process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log( "App now running on port", port );
  });
});



// Generic error handler used by all endpoints.
function handleError( res, reason, message, code ) {
  console.log( "ERROR: " + reason );
  res.status( code || 500).json( { "error": message } );
}

// TEST API ROUTE
//=============================================================================================

router.get('/', function(request, response) {
	response.json({ msg-name:'Test Confirmation' msg-content:'Howdy pardner, Test sucessful! Good job pal!' });
});

// USER API ROUTES
//=============================================================================================

// TBA

//=============================================================================================