var express = require('express');
var router = express.Router();
var user = require('../controllers/user.js');
// var path = require('path');

// var multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// })

// const upload = multer({storage: storage});

// var dir = path.join(__dirname, '../', 'uploads/post');
// console.log(dir);


router.get('/get', user.getUser);
router.post('/create', user.createUser);
router.get('/delete', user.deleteUser);
router.get('/currentUser', user.currentUser);
router.get('/logout', user.logOut);
router.post('/login', user.login);

// router.get('/images-post', express.static(dir));

module.exports = router;