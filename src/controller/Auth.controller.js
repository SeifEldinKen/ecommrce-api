const UserModel = require('../model/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    registerValidation, 
    loginValidation
} = require('../helpers/validation_schema')


const singAccessToken = async (userId) => {
    const payload = {
        userId
    }
    const secret = "some super secret"
    const options = {}
    const token = await jwt.sign(payload, secret, options)
    return token
}


exports.register = async (req, res, next) => {

    // Validate data request
    const {error} = registerValidation(req.body)
    if(error) {
        return res.status(422).json({
            message: error.details[0].message
        })
    }

    // Check if the email exists in the database
    const checkEmailExists = await UserModel.exists({email: req.body.email})
    if(checkEmailExists) {
        res.status(400).json({
            message: "Email already exists"
        })
    }

    // Hash password
    const hashPassword = await bcrypt.hash(req.body.password, 10)

    // Create a new user
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashPassword
    })

    try {
        
        // Save user in database
        const savedUser = await newUser.save()
        res.json(savedUser)

    } catch(error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {

    // Validate data request
    const {error} = loginValidation(req.body)
    if(error) {
        return res.status(422).json({
            message: error.details[0].message
        })
    }

    // Check if the email exists in the database
    const checkEmailExists = await UserModel.exists({email: req.body.email})
    if(!checkEmailExists) {
        res.status(400).json({
            message: "Email is not found"
        })
        // Email or password is wrong
    }


    // find user
    const user = await UserModel.findOne({email: req.body.email})

    //Password correct
    const match = await bcrypt.compare(req.body.password, user.password)
    if(!match) {
        res.status(400).json({
            message: "Invalid password" 
        })
    }

    // Generating the JWT Token
    const token = jwt.sign({_id: user._id}, "USER")
    res.header(`auth-token`, token).json({
        token: token
    })
}