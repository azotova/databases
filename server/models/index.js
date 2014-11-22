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
    post: function () {
      db.connect();
      db.end();
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

