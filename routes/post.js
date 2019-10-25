var express = require('express');
var router = new express.Router();
var post = require('../controllers/post.js');

router.route('post/:id?')
    .get(post.get)
    .post(post.post)
    .put(post.put)
    .delete(post.delete);

module.exports = router;