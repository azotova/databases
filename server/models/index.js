var db = require('../db');




module.exports = {
  messages: {
    get: function (callback) {
      //db.connect();
      db.query('select * from messages', function (err, results) {
      	if (err) throw err;
      	console.log("resultsLook", results);
      	callback(results);
      })
     // db.end();
    }, // a function which produces all the messages
    post: function (toInsert, timeStamp, objectId, callback) {
      var insertion = [];
      insertion.push(timeStamp);
      insertion.push(String(objectId));
      insertion.push("'"+toInsert.roomname+"'");
      insertion.push("'"+toInsert.text+"'")
      insertion.push(timeStamp)
      insertion.push("'"+toInsert.username+"'");
      insertion = insertion.toString();
      console.log("ins", insertion);
      console.log("query", 'insert into messages (createdAt, objectId, roomname, text, updatedAt, username) values ('+insertion+')');
      db.query('insert into messages (createdAt, objectId, roomname, messageText,updatedAt, username) values ('+insertion+')',
      	        function (err, results){
      	          if (err) throw err;
      	          callback();
               })
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

