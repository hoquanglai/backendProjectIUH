var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var address_controller = require('../controllers/address');


// a simple test url to check that all of our files are communicating correctly.
router.get('/all', address_controller.getAll);

module.exports = router;