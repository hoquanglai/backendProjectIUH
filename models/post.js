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
    }
});
module.exports = PostSchema;