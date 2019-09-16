require('dotenv').config()

const userAction = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    actionRegisterUser: (req, res) => {
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const password = bcrypt.hashSync(req.body.password)
        const birth = req.body.birth
        const level = 'user'

        userAction.createUser([first_name, last_name, email, password, birth, level])
            .then(result => {
                console.log(result)
                userAction.findUserByEmail(email)
                .then(row => {
                    Object.keys(row).forEach((key) => {
                        const user = row[key]
                        const accessToken = jwt.sign({
                            id: user.id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            birth: user.birth,
                            level: user.level
                        }, process.env.SECRET_KEY)
                        res.status(200).send({
                            status: 200,
                            message: 'Register Success',
                            accessToken: accessToken,
                        })
                    })
                })
                .catch(err => res.send({
                    status: 400,
                    message: 'Something Went Wrong',
                    err
                }))
            })
            .catch(err => res.send({
                status: 400,
                message: 'Somthing Went Wrong',
                err
            }))
    },
    actionRegisterPartner: (req, res) => {
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const password = bcrypt.hashSync(req.body.password)
        const birth = req.body.birth
        const level = 'mitra'

        userAction.createUser([first_name, last_name, email, password, birth, level])
            .then(result => {
                console.log(result)
                userAction.findUserByEmail(email)
                .then(row => {
                    Object.keys(row).forEach((key) => {
                        const user = row[key]
                        const accessToken = jwt.sign({
                            id: user.id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            birth: user.birth,
                            level: user.level
                        }, process.env.SECRET_KEY)
                        res.status(200).send({
                            status: 200,
                            message: 'Register Success',
                            accessToken: accessToken,

                        })
                    })
                })
                .catch(err => res.send({
                    status: 400,
                    message: 'Something Went Wrong',
                    err
                }))
            })
            .catch(err => res.send({
                status: 400,
                message: 'Somthing Went Wrong',
                err
            }))
    },
    actionLogin: (req, res) => {
        const email = req.body.email
        const password = req.body.password

        userAction.findUserByEmail(email)
            .then(row => {
                Object.keys(row).forEach((key) => {
                    const user = row[key]

                    const result = bcrypt.compareSync(password, user.password)
                    if (!result) return res.status(401).send('User not Found')
                    const accessToken = jwt.sign({
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        birth: user.birth,
                        level: user.level
                    }, process.env.SECRET_KEY)
                    res.status(200).send({
                        status: 200,
                        message: 'Login Success',
                        accessToken: accessToken,
                    })
                })
            })
    }
}