var express = require('express');

// Import the model (cat.js) to use its database functions.
var burger = require('../models/burger');

var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get('/', function (req, res) {
    burger.selectAll(function (data) {
      var hdbrsObj = {
        burgers: data,
      };
      console.log(hdbrsObj);
      res.render('index', hdbrsObj);
    });
  });
  
  router.post('/api/burgers', function (req, res) {
    burger.insertOne(
      ['burger_name', 'devoured'],
      [req.body.burger_name, req.body.devoured],
      function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
      }
    );
  });
  
  
  });



// Export routes for server.js to use.
module.exports = router;