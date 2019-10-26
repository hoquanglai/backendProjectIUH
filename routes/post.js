var express = require('express');
var router = express.Router();
var post = require('../controllers/post.js');
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({storage: storage});


router.get('/get', post.getPost);
router.post('/create', upload.single('file'), post.createPost);

module.exports = router;