const express = require('express')
const AuthController = require('../controller/Auth.controller')

const router = express.Router()



// API
router.post('/register', AuthController.register)
router.post('/login')


module.exports = router 