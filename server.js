// Dependencies
var restify = require('restify');
var bunyan = require('bunyan');
var restifyRoutes = require('restify-routes');
var restifyBunyanLogger = require('restify-bunyan-logger');

// Variables
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var verbose = process.env.VERBOSE || 'true';

// Setup server
var name = 'StreamCo';

var logger = bunyan.createLogger({
  name: name,
  streams: [
    {
      level: 'info',
      path: './access.log'
    },
    {
      level: 'error',
      path: './error.log'
    }
  ]
});

var server = restify.createServer({
  name: name,
  log: logger,
  formatters: {
    'application/json': function formatJSON(req, res, body) {
      if ( body instanceof Error && body.statusCode === 400) {

        // Custom Invalid JSON error.
        body = {
            "error": "Could not decode request: JSON parsing failed"
        };

      } else if ( Buffer.isBuffer( body ) ) {
        body = body.toString( 'base64' );
      }

      var data = JSON.stringify( body );
      res.setHeader( 'Content-Length', Buffer.byteLength( data ) );

      return data;
    }
  }
});

// Server middleware
server.pre(restify.pre.sanitizePath());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.authorizationParser());

// Enable CORS
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  return next();
});

// Load Routes
restifyRoutes.set(server, __dirname + '/routes');

// Starts server
server.listen(port, function () {
  if(verbose === 'true') {
    console.log('Server started in', env, 'environment')
    console.log('%s listening at %s', server.name, server.url);
  }
});
