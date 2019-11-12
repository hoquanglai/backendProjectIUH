var mongoose = require('mongoose');
var userSchema = require('../models/user.js');
var {register} = require('../controllers/validation');
var bcrypt = require('bcryptjs');

userSchema.statics = {
    createUser: async function (user, res, cb) {
        const { error } = register(user);
        if (error) return res.status(400).send(error.details[0].message);
        const emailExist = await this.findOne({email: user.email});
        if (emailExist) {
            return res.status(400).send('Email already exist');
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.pwd, salt);
        user.pwd = hashPassword;
        var user = new this(user)
        user.save(cb);
    },
    get: function (query, cb) {

    }
}
var userModel = mongoose.model('User', userSchema);

module.exports = userModel