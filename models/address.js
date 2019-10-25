var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    name: {type: String, required: true}
});

// Export the model
module.exports = mongoose.model('Address', AddressSchema);