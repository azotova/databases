var express = require('express');
var db = require('./db');
var requ = require("./request-handler.js");
var handleRequest = requ.requestHandler;
var url = require('url');
var path = require('path');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/classes", router);

var whereTo = path.join(__dirname, "../client/client"); //path to static content

// Serve the client files
app.use(express.static(whereTo));

/*app.get('/, function (req, res) {
  var pathName = url.parse(req.url).pathname;
  console.log("pathN", pathName);
  res.send('Hello World!')
});*/

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

/*GET /?username=Anastasia 304 4.977 ms - -
GET /classes/messages?order=-createdAt - - ms - -
GET /styles/styles.css 304 4.449 ms - -
GET /bower_components/jquery/jquery.min.js 304 4.056 ms - -
GET /bower_components/underscore/underscore-min.js 304 3.336 ms - -
GET /env/config.js 304 3.366 ms - -
GET /scripts/app.js 304 0.866 ms - -
GET /images/spiffygif_46x46.gif 304 1.069 ms - -
The requests from the file;
*/

