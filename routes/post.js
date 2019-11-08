var express = require('express');
var router = express.Router();
var post = require('../controllers/post.js');
var path = require('path');

var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});

var dir = path.join(__dirname, '../', 'uploads/post');
console.log(dir);


router.get('/get', post.getPost);
router.post('/create', upload.single('file'), post.createPost);
// router.get('/images-post', express.static(dir));

module.exports = router;