var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    name: {type: String, required: true, max: 100},
    pwd: {type: String, required: true},
    phone: {type: Number, required: true},
    description: {type: String, required: true, max: 500},
    adress: {type: String, required: true,}
});

// Export the model
module.exports = mongoose.model('Account', AccountSchema);