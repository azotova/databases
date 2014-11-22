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
      utils.sendResponse(res, {results: messages});
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log("body", req.body);
      messages.push(req.body);
      objectId++;
      utils.sendResponse(response, {objectId: objectId}, 201);
      /*utils.collectData(req, function(message){
        message.objectId = ++objectId;
        messages.push(message);
        utils.sendResponse(response, {objectId: objectId});
      });*/
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

