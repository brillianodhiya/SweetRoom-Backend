const express = require('express')
const Route = express.Router()

const paymentController = require('../controllers/payment')
const Auth = require('../middleware/auth')

Route
    .post('/:id', Auth,paymentController.actionPay)
    .post('/callback/a', paymentController.callBackPayment)
    .get('/getall', paymentController.getAllPayment)

module.exports = Route