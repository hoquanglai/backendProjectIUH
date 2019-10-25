var postRepository = require('../repository/postRepository.js');

exports.createPost = function (req, res, next) {
    var post = {

    };
    postRepository.create(post, function (err, hero) {
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