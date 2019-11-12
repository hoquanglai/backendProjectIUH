
//Validition
const joi = require('@hapi/joi');

const register = (data) => {
    const schema = {
        name: joi.string().required(),
        email: joi.string().min(6).required(),
        pwd: joi.string().min(6).required(),
    }
    return joi.validate(data, schema)
}

const login = (data) => {
    const schema = {
        email: joi.string().min(6).required(),
        pwd: joi.string().min(6).required(),
    }
    return joi.validate(data, schema)
}

module.exports.register = register;
module.exports.login = login;
