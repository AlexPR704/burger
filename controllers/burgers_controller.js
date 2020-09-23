var express = require('express');

// Import the model (cat.js) to use its database functions.
var burger = require('../models/burger');

var router = express.Router();




// Export routes for server.js to use.
module.exports = router;