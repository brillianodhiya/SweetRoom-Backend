const express = require('express')
const Route = express.Router()

const reservationController = require('../controllers/reservation')
const Auth = require('../middleware/auth')

Route
    .post('/:hotel_id/:user_id')

module.exports = Route