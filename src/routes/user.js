const express = require('express')
const Route = express.Router()

const userController = require('../controllers/user')
const Auth = require('../middleware/auth')

Route
    .post('/register', userController.actionRegisterUser)
    .post('/mitraregister', userController.actionRegisterPartner)
    .post('/login', userController.actionLogin)
    .get('/:id', userController.actionFindUserById)
    .delete('/:id', userController.actionDeleteUser)

module.exports = Route