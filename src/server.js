const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const dotenv = require('dotenv')
const verify = require('./helpers/verifyToken')
dotenv.config()

// Init Database 
require('../src/helpers/init_mongodb')

// Import routes
const AuthRouter = require('./router/Auth.router')
const PostRouter = require('./router/Post.router')


// Create App 
const app = express()

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes middleware
app.use('/api', AuthRouter)
app.use('/api', verify, PostRouter)

app.use(async (req, res, next) => {
    next(createError.NotFound("Not found"))
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.send({
        error: {
            status: error.status || 500,
            message: error.message 
        }
    })
})


// Create Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
