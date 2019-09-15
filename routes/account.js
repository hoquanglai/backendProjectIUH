var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var account_controller = require('../controllers/account');


// a simple test url to check that all of our files are communicating correctly.
router.get('/testt', account_controller.test);

router.post('/create', account_controller.Account_create);

router.get('/:id', account_controller.Account_details);

router.put('/:id/update', account_controller.Account_update);

router.delete('/:id/delete', account_controller.Account_delete);


module.exports = router;