// Import MySQL connection.
var connection = require('../config/connection');

// Helper function for SQL syntax.
function createQmarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push('?');
    }
    return arr.toString();
  }

  // Helper function to convert object key/value pairs to SQL syntax
function translateSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === 'string' && value.indexOf(' ') >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + '=' + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  
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
    // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function (table, objColVals, condition, cb) {
    var dbQuery = 
    'UPDATE ' + 
    table +
    ' SET ' +
    translateSql(objColVals) +
    " WHERE " +
    condition;

    console.log(dbQuery);
    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },
  deleteOne: function (table, condition, cb) {
    var dbQuery = " DELETE FROM " + table + " WHERE " + condition;
    console.log(dbQuery);
    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },
};

// Export the orm object for the model (cat.js).
module.exports = orm;