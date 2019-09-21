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
  paymentAction: (datas, external_id) =>
    new Promise((resolve, reject) => {
      conn.query(
        "UPDATE payment SET ? WHERE external_id = ?",
        [datas, external_id],
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
//   makeItSuccess: external_id =>
//     new Promise((resolve, reject) => {
//       conn.query(
//         "UPDATE hotel_reservation SET status = 'success' WHERE invoice = ? ",
//         external_id,
//         (err, row) => {
//           !err ? resolve(row) : reject(err);
//         }
//       );
//     }),
  getPaymentPrice: id =>
    new Promise((resolve, reject) => {
      conn.query(
        "SELECT invoice, price, room_number, hotel_id, bed_type FROM hotel_reservation WHERE id = ?",
        id,
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
    getPaymentPriceByInvocie: invoice =>
    new Promise((resolve, reject) => {
      conn.query(
        "SELECT invoice, price, room_number, hotel_id, bed_type FROM hotel_reservation WHERE invoice = ?",
        invoice,
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
    getStatus: (status, external_id) =>
    new Promise((resolve, reject) => {
      conn.query(
        "UPDATE hotel_reservation SET ? WHERE invoice = ?",
        [status, external_id],
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
    roomChangeStatus: (room_number, hotel_id, bed_type, price) =>
      new Promise((resolve, reject) => {
        conn.query(
          "UPDATE room SET status = '1' WHERE hotel_id = ? AND bed_type = ? AND room_number = ? AND price = ?",
          [hotel_id, bed_type, room_number , price],
          (err, row) => {
            !err ? resolve(row) : reject(err)
          }
        )
      }),
    getAllPayment: () =>
    new Promise((resolve, reject) => {
      conn.query("SELECT * FROM payment ORDER BY id DESC", (err, row) => {
        !err ? resolve(row) : reject(err)
      })
    })
};
