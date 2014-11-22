var models = require('../models');
var bluebird = require('bluebird');
var utils = require('./utils.js')

var objectId = 1;

var messages = [
  {
    text: 'hello world',
    username: 'fred',
    objectId: objectId
  }
];


module.exports = {
  messages: {
    get: function (req, res) {
    	   models.messages.get(function(resData) {
    	     console.log("obj", resData);
              utils.sendResponse(res, {results: resData});
    	   })
    	//utils.sendResponse(res, {results:messages});
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log("body", req.body);
      messages.push(req.body);
      objectId++;
      utils.sendResponse(res, {objectId: objectId}, 201);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

