const Joi = require('joi')

const authRegister = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'net']
        }
    }).trim().lowercase().required(),
    phoneNumber: Joi.string(),
    password: Joi.string().min(6).max(32).required(),
})

const authLogin = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'net']
        }
    }).trim().lowercase().required(),
    password: Joi.string().min(6).max(32).required()
})

module.exports = {
    authRegister,
    authLogin
}