var postRepository = require('../repository/postRepository.js');

exports.createPost = function (req, res, next) {
    // console.log(req.file);
    
    var post = {

    };
    // postRepository.create(post, function (err, hero) {
    //     if (err) {
    //         res.json({
    //             error: err
    //         })
    //     }
    //     res.json({
    //         message: "Post create sucessfully"
    //     })
    // })
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