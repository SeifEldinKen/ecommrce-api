const PostModel = require('../model/Post.model')
const ValidateSchema = require('../helpers/validation_schema')
const { post } = require('../router/Post.router')
const { json } = require('express')


exports.createPost = async (req, res, next) => {
    
    try {

        // Validate data request
        const resultRequest = await ValidateSchema.post.validateAsync(req.body)

        // New post
        const newPost = new PostModel({
            title: resultRequest.title,
            description: resultRequest.description
        })

        // Save post in database
        await newPost.save((error, result) => {
            if(error) {
                res.status(500).send({
                    error
                })
            } else {
                res.status(200).send({
                    code: 200,
                    message: "Post Added Successfully",
                    addUser: result
                })
            }
        })

    } catch(error) {
        if(error.isJoi === true) {
            error.status = 422
        }
        next(error)
    }

}

exports.getAllPosts = async (req, res, next) => {

    try {

        const posts = await PostModel.find()
        res.json(posts)

    } catch(error) {
        next(error)
    }

}