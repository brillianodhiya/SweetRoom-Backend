require('dotenv').config()
const payment = require("../models/payment")
const jwtDecode = require("jwt-decode")
const axios = require("axios")
const express = require('express')
const Request = express.Router()

const Authorization = 'Basic eG5kX2RldmVsb3BtZW50XzY0S1hHd3hzYWJtVnVUbUxkYTZrNllQVFpiNWdtbmM4RG5VN0xQUnowZFdRTmhZekl1VnBqRFhHdmNscVc6'

module.exports = {
    actionPay: (req, res) => {
        const token = req.headers['sweet_token']
        const decoded = jwtDecode(token)

        const id = req.params.id

        payment.getPaymentPrice(id)
            .then(row => {
                Object.keys(row).forEach(key => {
                    const data_pay = row[key]
                    
                    const external_id = data_pay.invoice
                    const amount = data_pay.price
                    const payer_email = decoded.email
                    const description = 'Room Number ' + data_pay.room_number
                    const status = 'PENDING'

                    payment.createPayment([external_id, amount, payer_email, description, status])
                        .then(async result => {
                            await axios.post("https://api.xendit.co/v2/invoices", {
                                external_id: external_id,
                                amount: amount,
                                payer_email: payer_email,
                                description: description
                            },{
                                headers: { 
                                    Authorization: Authorization,
                                    'Content-Type': 'application/json; charset=utf-8',
                                    'Host': 'api.xendit.co',
                                    'Connection': 'keep-alive'
                                 }}
                            )
                            .then(results => {
                                const status = {
                                    status: results.data.status,
                                }
                                const datas = {
                                    payment_id: results.data.id
                                }
                                payment.getStatus(status, external_id)
                                .then(rows => {
                                    // console.log(rows)
                                    payment.paymentAction(datas, external_id)
                                    .then(lastrow => {
                                        res.json({
                                            success: true,
                                            message: 'Success Create Payment',
                                            data: results.data,
                                            action: lastrow,
                                            error: ['']
                                        })
                                    })
                                    .catch(errors => {
                                        res.json({
                                            success: false,
                                            message: 'Success Result',
                                            data: [''],
                                            error: errors
                                        })
                                    })
                                    // res.json({
                                    //     success: false,
                                    //     message: 'failed insert to hotel_reservation',
                                    //     data: rows,
                                    //     error: ['']
                                    // })
                                })
                                .catch(err => {
                                    res.json({
                                        success: false,
                                        message: 'failed inster to hotel_reservation',
                                        data: [''],
                                        error: err
                                    })
                                })
                                // res.json({
                                //     success: failed,
                                //     message: "Success Only Create Payment",
                                //     data: results,
                                //     error: ['']
                                // })
                            })
                            .catch(errs => {
                                res.json({
                                    success: false,
                                    message: "Payment Failed",
                                    data: [''],
                                    error: errs
                                })
                            })
                            // res.json({
                            //     success: false,
                            //     message: "Insert Database",
                            //     data: result,
                            //     error: ['']
                            // })
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
        const datas = {
            external_id: req.body.external_id,
            status: req.body.status,
            bank_code: req.body.bank_code,
            paid_amount: req.body.paid_amount
        }
        const external_id = req.body.external_id

        payment.paymentAction(datas, external_id)
            .then(result => {
                const status = {
                    status: req.body.status
                }
                payment.getStatus(status, external_id)
                .then(row => {
                    payment.getPaymentPriceByInvocie(external_id)
                    .then(ress => {
                        Object.keys(ress).forEach(key => {
                            const DataResult = ress[key]

                            const hotel_id = DataResult.hotel_id
                            const bed_type = DataResult.bed_type
                            const room_number = DataResult.room_number
                            const price = DataResult.price

                            payment.roomChangeStatus(room_number, hotel_id, bed_type, price)
                            .then(rows => {
                                res.json(rows)
                            })
                            .catch(err => {
                                res.json({
                                    err: err
                                })
                            })
                        })

                        // const data = {
                        //     status: '1'
                        // }

                    })
                    // res.json({
                    //     row
                    // })
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: 'payment progress failed',
                        data: [''],
                        error: err
                    })
                })
                // res.json({
                //     success: false,
                //     message: 'cant make success',
                //     data: row,
                //     error: ['']
                // })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'something wrong',
                    data: [''],
                    error: err
                })
            })
    },
    getAllPayment: (req, res) => {
        payment.getAllPayment()
        .then(row => {
            res.json({
                row
            })
        })
        .catch(err => {
            res.json({
                err
            })
        })
    }
}