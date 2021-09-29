const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const initMongodb = require('../src/helpers/init_mongodb')
require('dotenv').config()

// Create App 
const app = express()

app.use(morgan('dev'))

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

initMongodb()


// Create Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
