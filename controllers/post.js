var postRepository = require('../repository/postRepository.js');

exports.createPost = function (req, res, next) {
    const postModel = JSON.parse(req.body.post);
    postRepository.create(postModel, req, function (err, post) {
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

exports.getPost = function (req, res, next) {
    const start = req.query.start;
    const end = req.query.end;
    postRepository.get({}, start, end, function (err, post) {
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

exports.deletePost = function (req, res, next) {
    postRepository.deletePost({}, function (err, post) {
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