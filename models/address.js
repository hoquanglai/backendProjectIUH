var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    Place: {type: String, required: true, max: 100},
});

// Export the model
module.exports = mongoose.model('Address', AddressSchema);