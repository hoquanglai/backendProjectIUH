var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
    // imageId: {
    //     type: String,
    // }
});
module.exports = UserSchema;
// module.exports = mongoose.model('User', UserSchema);

// var user = mongoose.model('User', UserSchema);
// exports.UserSchema = UserSchema;
// module.exports = user;