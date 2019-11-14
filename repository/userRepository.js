var mongoose = require('mongoose');
var userSchema = require('../models/user.js');
var {register, loginValidation} = require('../controllers/validation');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

userSchema.statics = {
    createUser: async function (user, res, cb) {
        const { error } = register(user);
        if (error) return res.status(400).send(error.details[0].message);
        // const emailExist = await this.findOne({email: user.email});
        // if (emailExist) {
        //     return res.status(400).send('Email already exist');
        // }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.pwd, salt);
        user.pwd = hashPassword;
        var user = new this(user)
        user.save(cb);
    },
    findUser: function (query, cb) {
        this.findOne(query, cb);
    },
    deleteUser : function (query, cb) {
        this.remove(query, cb);
        
    },
    loginUser: async function (req, res, cb) {
        const { error } = loginValidation(req);
        if (error) return res.status(400).send(error.details[0].message);

        const emailExist = await this.findOne({email: req.email});
        if (!emailExist) {
            return res.status(400).send("Email or password is wrong");
        }
        const validPass = await bcrypt.compare(req.pwd, emailExist.pwd);
        if (!validPass) {
            res.status(400).send("Invalid password");
        }
        const token = jwt.sign({_id: emailExist._id}, process.env.TOKEN_SERECT);
        res.header('auth-token', token).send(token);

        // res.json({
        //     user: "Login success"
        // })
    }
}
var userModel = mongoose.model('User', userSchema);

module.exports = userModel