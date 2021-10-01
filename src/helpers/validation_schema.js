const Joi = require('joi')


const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
        .max(30)
        .min(3)
        .required(),
        email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        })
        .trim()
        .lowercase()
        .required(),
        phoneNumber: Joi.string(),
        password: Joi.string()
        .max(1024)
        .min(6)
        .required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        })
        .trim()
        .lowercase()
        .required(),
        password: Joi.string()
        .max(1024)
        .min(6)
        .required()
    })
    return schema.validate(data)
}

const createPostValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string()
        .required(),
        description: Joi.string()
        .required()
    })
    return schema.validate(data)
}

module.exports = {
    registerValidation,
    loginValidation,
    createPostValidation
}