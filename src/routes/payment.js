const express = require('express')
const Route = express.Router()

const paymentController = require('../controllers/payment')
const Auth = require('../middleware/auth')



module.exports = Route