var userRepository = require('../repository/userRepository.js');
var User = require('../models/user');

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
        res.json({
            user: user
        })
    })
    // userRepository.createUser(user, function (err, user) {
    //     if (err) {
    //         res.json({
    //             error: err
    //         })
    //     }
    //     res.json({
    //         message: "User create sucessfully"
    //     })
    // })
}

exports.getUser = function (req, res, next) {
    userRepository.get({}, function (err, post) {
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