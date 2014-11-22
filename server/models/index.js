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
      if (toInsert.text) {
        insertion.push(db.escape(toInsert.text)); 	
      } else {
      	insertion.push(db.escape(toInsert.message)); 
      }
      insertion.push(timeStamp)
      insertion.push("'"+toInsert.username+"'");
      insertion = insertion.toString();
      console.log("ins", insertion);
      console.log("query", 'insert into messages (createdAt, objectId, roomname, text, updatedAt, username) values ('+insertion+')');
      db.query('insert into messages (createdAt, objectId, roomname, text,updatedAt, username) values ('+insertion+')',
      	        function (err, results){
      	          if (err) throw err;
      	          callback();
               })
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('select * from users', function (err, results) {
      	if (err) throw err;
      	console.log("resultsLookUsers", results);
      	callback(results);
      })
    },
    post: function (toInsert, callback) {
      var insertion = [];
      insertion.push("'"+toInsert.username+"'");
      insertion = insertion.toString();
      console.log("insUser", insertion);
      db.query('insert into users (username) values ('+insertion+')',
      	        function (err, results){
      	          if (err) throw err;
      	          callback();
               })
    }
  }
};

