require('dotenv').config()
const payment = require("../models/payment")
const jwtDecode = require("jwt-decode")
const axios = require("axios")
const express = require('express')
const Request = express.Router()

const Authorization = process.env.BASIC_TOKEN

module.exports = {
    actionPay: (req, res) => {
        const token = req.headers['sweet_token']
        const decoded = jwtDecode(token)

        const id = req.params.id

        payment.getPaymentPrice(id)
            .then(row => {
                Object.keys(row).forEach(key => {
                    const data = row[key]
                    
                    const external_id = data.invoice
                    const amount = data.price
                    const payer_email = decoded.email
                    const description = 'Room Number' + data.room_number
                    const status = 'PENDING'

                    payment.createPayment([external_id, amount, payer_email, description, status])
                        .then(result => {
                            axios.post("https://api.xendit.co/v2/invoices", {
                                external_id: external_id,
                                amount: amount,
                                payer_email: payer_email,
                                description: description
                            },{
                                headers: { Authorization: Authorization }}
                            )
                            .then(results => {
                                res.json({
                                    success: true,
                                    message: "Success Create Payment",
                                    data: results,
                                    error: ['']
                                })
                            })
                            .catch(err => {
                                res.json({
                                    success: false,
                                    message: "Payment Failed",
                                    data: [''],
                                    error: err
                                })
                            })
                            res.json({
                                success: false,
                                message: "Insert Database",
                                data: result,
                                error: ['']
                            })
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: "payment failed",
                                data: id,
                                error: err
                              })
                        })
                })                
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "something wrong",
                    data: id,
                    error: err
                  })
            })
    },
    callBackPayment: (req, res) => {
        const data = {
            external_id: req.body.external_id,
            status: req.body.status,
            bank_code: req.body.bank_code,
            paid_amount: req.body.paid_amount
        }
        const external_id = req.body.external_id

        payment.paymentAction(data, external_id)
            .then(row => {
                payment.makeItSuccess(external_id)
                .then(row => {
                    res.json({
                        success: true,
                        message: 'payment success',
                        data: row,
                        error: ['']
                    })
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: 'payment progress failed',
                        data: [''],
                        error: err
                    })
                })
                res.json({
                    success: false,
                    message: 'cant make success',
                    data: row,
                    error: ['']
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'something wrong',
                    data: [''],
                    error: err
                })
            })
    }
}