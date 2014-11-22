/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

//var exports = module.exports = {};
var url = require("url");
var ourMessages = {results:[]};

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);
  
  var objectID = 0;
  var path = url.parse(request.url).pathname;


  console.log("pathNew", path);
  var routes = {"/classes/messages": "Ok", "/classes/room1": "Ok"};

  
  var dealWithMethods = function(request, response) {
    if (request.method==="GET") {
      // The outgoing status.
      var statusCode = 200;
      // See the note below about CORS headers.
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = "application/json";
      // .writeHead() writes to the request line and headers of the response,
      // which includes the status and all headers.
      response.writeHead(statusCode, headers);    
      response.end(JSON.stringify(ourMessages));     
    } else if (request.method==="POST") {
      var stringData = "";
      request.on('data', function (chunk) {
        stringData += chunk;
      });
      var statusCode = 201;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = "application/json";
      objectID++;
      var createdAt = new Date ();    
      request.on("end", function () {
        ourMessages.results.push(JSON.parse(stringData));
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify({objectId:objectID, createdAt: createdAt}));
      })
    } else if (request.method ==="OPTIONS") {
      var statusCode = 200;
      // See the note below about CORS headers.
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = "application/json";
      // .writeHead() writes to the request line and headers of the response,
      // which includes the status and all headers.
      response.writeHead(statusCode, headers);    
      response.end("{}"); 
    }
  } 

  

  if (path in routes) {
  //  console.log("funcy", routes[path]);
    dealWithMethods(request, response);
  } else {
    var statusCode = 404;
    // See the note below about CORS headers.
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    response.writeHead(statusCode, headers);    
    response.end("{}"); 
  }
  
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;







