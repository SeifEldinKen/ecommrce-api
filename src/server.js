const express = require('express')
const morgan = require('morgan')
const createError = require('http-error')
require('dotenv').config()

// Create App 
const app = express()



// Create Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
