var express = require('express');
var router = express.Router();
var post = require('../controllers/post.js');


router.get('/get', post.getPost);
router.post('/create', post.createPost);

module.exports = router;