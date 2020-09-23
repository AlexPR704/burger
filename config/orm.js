// Import MySQL connection.
var connection = require('../config/connection');

// Object for all our SQL statement functions.
var orm = {
    selectAll: function (table, cb) {
      var dbQuery = 'SELECT * FROM ' + table + ';';
      connection.query(dbQuery, function (err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    },
    insertOne: function (table, cols, vals, cb) {
      var dbQuery = 
      'INSERT INTO ' + 
      table +
      ' (' +
      cols.toString() +
      ') ' +
      'VALUES (' +
      createQmarks(vals.length) +
      ') ';
  
      console.log(dbQuery);
  
      connection.query(dbQuery, vals, function (err, res) {
        if (err) {
          throw err;
        }
  
        cb(res);
      });
    },

// Export the orm object for the model (cat.js).
module.exports = orm;