require('dotenv').config()

const userAction = require('../models/user')
const jwt = require('jsonwebtoken')
// const MiscHelper = require('../middleware/helpers')
const bcrypt = require('bcryptjs')

module.exports = {
    actionRegisterUser: (req, res) => {
        // const generateSalt = MiscHelper.generateSalt(18)
        // const passwordHash = MiscHelper.setPassword(req.body.password, generateSalt)
        //input database
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const password = bcrypt.hashSync(req.body.password)
        const birth = req.body.birth
        const photo = 'https://cdn.kastatic.org/images/avatars/svg/marcimus.svg'
        const level = 'user'
        const longitude = req.body.longitude
        const latitude = req.body.latitude
        const firebase_id = req.body.firebase_id

        userAction.createUser([first_name, last_name, email, password, birth, photo, level, longitude, latitude, firebase_id])
            .then(result => {
                // console.log(result)
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
                            photo: user.photo,
                            level: user.level,
                            longitude: user.longitude,
                            latitude: user.latitude,
                            firebase_id: user.firebase_id
                        }, process.env.SECRET_KEY)
                        // const resultRegister = [result, accessToken]
                        // res.status(200).send({
                        //     status: 200,
                        //     message: 'Register Success',
                        //     result: result,
                        //     accessToken: accessToken,
                        // })
                        res.json({
                            success: true,
                            message: 'Success Register',
                            data: result,
                            accessToken: accessToken,
                            error: ['']
                        })
                        // MiscHelper.response(res, resultRegister, 200)
                    })
                })
                .catch(err => res.json({ success: false, message: 'fail get data', data: [''], error: err }))
            })
            .catch(err => res.json({ success: false, message: 'fail get data', data: [''], error: err }))
    },
    actionRegisterPartner: (req, res) => {
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const password = bcrypt.hashSync(req.body.password)
        const birth = req.body.birth
        const photo = 'https://cdn.kastatic.org/images/avatars/svg/marcimus.svg'
        const level = 'mitra'
        const longitude = req.body.longitude
        const latitude = req.body.latitude
        const firebase_id = req.body.firebase_id

        userAction.createUser([first_name, last_name, email, password, birth, photo, level, longitude, latitude, firebase_id])
            .then(result => {
                // console.log(result)
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
                            photo: user.photo,
                            level: user.level,
                            longitude: user.longitude,
                            latitude: user.latitude,
                            firebase_id: user.firebase_id
                        }, process.env.SECRET_KEY)
                        // const resultRegister = [result, accessToken]
                        // res.status(200).send({
                        //     status: 200,
                        //     message: 'Register Success',
                        //     result: result,
                        //     accessToken: accessToken,
                        // })
                        res.json({
                            success: true,
                            message: 'Success Register',
                            data: result,
                            accessToken: accessToken,
                            error: ['']
                        })
                        // MiscHelper.response(res, resultRegister, 200)
                    })
                })
                .catch(err => res.json({ success: false, message: 'fail get data', data: [''], error: err }))
            })
            .catch(err => res.json({ success: false, message: 'fail get data', data: [''], error: err }))
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
                        photo: user.photo,
                        level: user.level,
                        longitude: user.longitude,
                        latitude: user.latitude,
                        firebase_id: user.firebase_id
                    }, process.env.SECRET_KEY)
                    res.status(200).send({
                        status: 200,
                        message: 'Login Success',
                        result: row,
                        accessToken: accessToken,
                    })
                })
            })
            .catch(err => res.send({
                status: 400,
                message: 'Somthing Went Wrong',
                err
            }))
    },
    actionFindUserById: (req, res) => {
        const id = req.params.id

        userAction.findUserById(id)
            .then((resultUser) => {
                res.json({
                    success: true,
                    message: 'Success Find User',
                    data: resultUser,
                    error: ['']
                })
            })
            .catch(err => res.json({ success: false, message: 'fail get data', data: [''], error: err }))
    },
    actionDeleteUser: (req, res) => {
        const id = req.params.id

        userAction.deleteUser(id)
            .then((resultDelete) => {
                res.json({
                    success: true,
                    message: 'Success Deleting',
                    data: resultDelete,
                    error: ['']
                })
            })
            .catch(err => res.json({ success: false, message: 'fail get data', data: [''], error: err }))
    }
}
