const UserModel = require('../model/User.model')
const authSchema = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const passwordToHash = (password) => {
    return bcrypt.hash(password, 10)
}

const checkUserExists = async (email) => {
    const result = await UserModel.exists({email})
    return result
}

exports.register = async (req, res, next) => {
    
    try {

        // Validate data request
        const dataRequest = await authSchema.validateAsync(req.body)
        
        // Check if the user exists in the database
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