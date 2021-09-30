const express = require('express')
const PostController = require('../controller/Post.controller') 

const router = express.Router()

router.post('/posts',PostController.createPost)
router.get('/posts', PostController.getAllPosts)

module.exports = router