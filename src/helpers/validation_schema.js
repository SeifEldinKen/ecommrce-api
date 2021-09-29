const Joi = require('joi')

const authSchema = Joi.object({
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

module.exports = authSchema