var mongoose = require('mongoose');
var postSchema = require('../models/post.js');

postSchema.statics = {
    create: function (data, cb) {
        var post = new this(data);
        post.save(cb);
    },
    get: function (query, cb) {
        this.find(query, cb)
    }
}

var postModel = mongoose.model('Post', postSchema);
module.exports = postModel;