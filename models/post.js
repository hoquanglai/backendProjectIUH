var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    money: {
        type: String,
        required: true
    },
    numberOfDay: {
        type: Number,
        required: true,
    },
    imageId: {
        type: String,
        required: false
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    userCreator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = PostSchema;