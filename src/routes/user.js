const express = require('express')
const Route = express.Router()

const userController = require('../controllers/user')
const Auth = require('../middleware/auth')

Route
    .post('/register', userController.actionRegisterUser)
    .post('/mitra', userController.actionRegisterPartner)
    .post('/login', userController.actionLogin)
    .get('/:id', Auth,userController.actionFindUserById)
    .delete('/:id', userController.actionDeleteUser)
    .patch('/:id', Auth,userController.actionUpdateUser)
    .post('/userbyEmail', userController.actionFindeByEmail)
    .get('/', userController.actionGetAll)
    .get('/allemail/a', userController.actionGetEmail)

module.exports = Route