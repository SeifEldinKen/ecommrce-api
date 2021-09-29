const UserModel = require('../model/User.model')
const authSchema = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
        if(result) {
            
        } else {

        }
        

    } catch(error) {
        if(error.isJoi === true) {
            error.status = 422
        } 
        next(error)
    }

}