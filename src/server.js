const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
// Init Database 
require('../src/helpers/init_mongodb')
require('dotenv').config()
const AuthRouter = require('./router/Auth.router')
const PostRouter = require('./router/Post.router')


// Create App 
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', AuthRouter)
app.use('/api', PostRouter)

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
