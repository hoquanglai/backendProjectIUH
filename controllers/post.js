var postRepository = require('../repository/postRepository.js');

exports.createPost = function (req, res, next) {
    const postModel = JSON.parse(req.body.post);
    postRepository.create(postModel, req, function (err, hero) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "Post create sucessfully"
        })
    })
}

exports.getPost = function (req, res, next) {
    postRepository.get({}, function (err, post) {
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