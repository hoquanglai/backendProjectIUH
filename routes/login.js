var express = require('express');
var router = express.Router();
const passport = require('passport')

// Require the controllers WHICH WE DID NOT CREATE YET!!
var login_controller = require('../controllers/login');


router.post('/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    } 
);

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})


router.get('/getInfo', login_controller.getInfo);

module.exports = router;