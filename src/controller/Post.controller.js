const PostModel = require('../model/Post.model')
const {createPostValidation} = require('../helpers/validation_schema')


exports.createPost = async (req, res, next) => {
    
    // Validate data request
    const {error} = createPostValidation(req.body)
    if(error) {
        return res.status(422).json({
            message: error.details[0].message
        })
    }

    // Create a new post
    const newPost = new PostModel({
        title: req.body.title,
        description: req.body.description
    })

    try {
        
        // Save post in database
        const savedPost = await newPost.save()
        res.json(savedPost)

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