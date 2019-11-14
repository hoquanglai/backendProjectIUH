var userRepository = require('../repository/userRepository.js');
var jwt = require('jsonwebtoken');

exports.createUser = function (req, res, next) {
    const user = {
        name: req.body.name,
        pwd: req.body.pwd,
        email: req.body.email
    }
    userRepository.createUser(user, res, function (err, user) {
        if (err) {
            res.json({
                error: err
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SERECT);
        res.json({
            user: user,
            token: token
        })
    })
}

exports.currentUser = function (req, res, next) {
    const userSession = req.header('auth-token');
    if (userSession === 'undefined' || null == userSession) {
        res.json({
            user: null
        })
        return
    }
    const verifyId = jwt.verify(userSession, process.env.TOKEN_SERECT);
    if (verifyId) {
        userRepository.findUser({ _id: verifyId._id }, function (err, user) {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                user: user
            })
        })
    }
}

exports.logOut = function (req, res, next) {
    userSession = {};
    res.json({
        user: null
    })
}

exports.getUser = function (req, res, next) {
    userRepository.get({}, function (err, user) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            post: post
        })
    })
}

exports.login = function (req, res, next) {
    console.log(req.body);

    userRepository.loginUser(req.body, res, function (err, user) {

    })
}

exports.deleteUser = function (req, res, next) {
    userRepository.deleteUser({}, function (err, user) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "delete success"
        })
    })
}