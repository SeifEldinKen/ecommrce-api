const UserModel = require('../model/User.model')
const ValidateSchema = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const passwordToHash = (password) => {
    return bcrypt.hash(password, 10)
}

const checkUserExists = async (email) => {
    const result = await UserModel.exists({email})
    return result
}

const fetchUserInDb = async (email) => {
    const findUser = await UserModel.findOne({email})
    return findUser
}

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
    
    try {

        // Validate data request
        const dataRequest = await ValidateSchema.authRegister.validateAsync(req.body)
        
        // Check if the email exists in the database
        const result = await checkUserExists(dataRequest.email)
        if(!result) {

            // New User
            const newUser = new UserModel({
                username: dataRequest.username,
                email: dataRequest.email,
                phoneNumber: dataRequest.phoneNumber,
                password: await passwordToHash(dataRequest.password)
            })

            // Save user in database
            await newUser.save((error, result) => {
                if(error) {
                    res.status(500).send({
                        error
                    })
                } else {
                    res.status(200).send({
                        code: 200,
                        message: "User Added Successfully",
                        addUser: result
                    })
                }
            })

        } else {
            res.status(404).json({
                message: "This user exists"
            })
        }
        

    } catch(error) {
        if(error.isJoi === true) {
            error.status = 422
        } 
        next(error)
    }

}

exports.login = async (req, res, next) => {
    
    try {

        // Validate data request
        const resultRequest = await ValidateSchema.authLogin.validateAsync(req.body)

        // Check if the email exists in the database
        const result = await checkUserExists(resultRequest.email)
        if(result) {

            // Get user from database
            const currentUser = await fetchUserInDb(resultRequest.email)

            const match = await bcrypt.compare(resultRequest.password, currentUser.password)
            if(match) {
                // Login

                const createJWT = await jwt.sign({
                    username: currentUser.username,
                    email: currentUser.email,
                    password: currentUser.password
                }, "USER")

                res.json({
                    message: "user logged it",
                    token: createJWT
                })

            } else {
                res.json({
                    message: "The password is incorrect"
                })
            }

        } else {
            res.json({
                message: "User is not exists"
            })
        }


    } catch(error) {
        if(error.isJoi === true) {
            error.status = 422
        } 
        next(error)
    }

}