require("dotenv").config();
const conn = require("../config/dbconfig");
// const Axios = require('axios')

module.exports = {
  createPayment: data =>
    new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO payment (external_id, amount, payer_email, description, status) VALUES (?,?,?,?,?)",
        data,
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
  paymentAction: (data, external_id) =>
    new Promise((resolve, reject) => {
      conn.query(
        "UPDATE payment SET ? WHERE external_id = ?",
        [data, external_id],
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
  makeItSuccess: external_id =>
    new Promise((resolve, reject) => {
      conn.query(
        "UPDATE hotel_reservation SET status = 'success' WHERE invoice = ? ",
        external_id,
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
  getPaymentPrice: id =>
    new Promise((resolve, reject) => {
      conn.query(
        "SELECT invoice, price, room_number FROM hotel_reservation WHERE invoice = ?",
        id,
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    })
};
