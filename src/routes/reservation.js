const express = require('express')
const Route = express.Router()

const reservationController = require('../controllers/reservation')
const Auth = require('../middleware/auth')

Route
    .all('/*', Auth)
    .post('/insert/:hotel_id', reservationController.insertReservation)
    .patch('/checkin/:id', reservationController.actionCheckIn)
    .patch('/checkout/:id', reservationController.actionCheckOut)
    .get('/:id', reservationController.actionFindReservation)
    .get('/place/:hotel_id', reservationController.actionFindReservByPlace)
    .get('/user/:user_id', reservationController.actionFindReservByUser)
    .delete('/delete/:id', reservationController.actionDeleteReservation)
    .post('/makeStatusSuccess/:id', reservationController.actionMakeSuccess)
    .post('/makeStatusCancel/:id', reservationController.actionMakeCancel)
    .get('/history/a', reservationController.History)
    .get('/latest/a', reservationController.getLatestRec)

module.exports = Route