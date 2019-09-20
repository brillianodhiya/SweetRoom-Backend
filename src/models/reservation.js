const conn = require("../config/dbconfig");

module.exports = {
  actionReservation: data =>
    new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO hotel_reservation (hotel_id, user_id, invoice, reservation_date, num_people, bed_type, room_number, price, plan_checkin, plan_checkout, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        data,
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
  actionCheck: (data, id) =>
    new Promise((resolve, reject) => {
      conn.query(
        "UPDATE hotel_reservation SET ? WHERE id = ?",
        [data, id],
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
//   actionCheckIn: (id) =>
//   new Promise((resolve, reject) => {
//     const dates = new Date().toDateString()
//     conn.query(
//         `UPDATE hotel_reservation SET check_in = '${dates}' WHERE id = ?`,
//         [id],
//         (err, row) => {
//             !err ? resolve(row) : reject
//         }
//     )
//   }),
//   actionCheckOut: (id) =>
//   new Promise((resolve, reject) => {
//     const dates = new Date().toDateString()
//     conn.query(
//         `UPDATE hotel_reservation SET check_out = '${dates}' WHERE id = ?`,
//         [id],
//         (err, row) => {
//             !err ? resolve(row) : reject
//         }
//     )
//   }),
  actionFindReservation: id =>
    new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM hotel_reservation WHERE id = ?",
        [id],
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
  actionFindReservByUser: user_id =>
    new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM hotel_reservation WHERE user_id = ?",
        [user_id],
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
  actionFindReservByPlace: hotel_id =>
    new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM hotel_reservation WHERE hotel_id = ?",
        [hotel_id],
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
  actionDeleteReservation: id =>
    new Promise((resolve, reject) => {
      conn.query(
        "DELETE FROM hotel_reservation WHERE id = ?",
        [id],
        (err, row) => {
          !err ? resolve(row) : reject(err);
        }
      );
    }),
  actionDetailHotel: id =>
    new Promise((resolve, reject) => {
      conn.query("SELECT * FROM room WHERE id = ?", [id], (err, row) => {
        !err ? resolve(row) : reject(err);
      });
    }),
  actionChangeStatusRoom: (data, id) =>
   new Promise((resolve, reject) => {
      conn.query("UPDATE room SET ? WHERE id = ? ", [data, id], (err, row) => {
        !err ? resolve(row) : reject(err)
      })
   }),
  actionHistory: user_id =>
    new Promise((resolve, reject) => {
      conn.query("SELECT hotel_reservation.id, hotel.image, hotel.hotel_name, \
      hotel.city, hotel_reservation.status, hotel.rate, hotel_reservation.plan_checkin, \
       hotel_reservation.plan_checkout, hotel_reservation.price, hotel_reservation.invoice, \
       payment.id as pid, payment.payment_id \
       FROM hotel_reservation JOIN hotel ON hotel_reservation.hotel_id = hotel.id JOIN payment ON hotel_reservation.invoice = payment.external_id WHERE hotel_reservation.user_id = ? ORDER BY hotel_reservation.id DESC", [user_id], (err, row) => {
        !err ? resolve(row) : reject(err)
      })
    }),
  getLatest: user_id =>
    new Promise((resolve, reject) => {
      conn.query("SELECT * FROM `hotel_reservation` WHERE status = 'waiting payment' AND user_id = ? ORDER BY id DESC", [user_id], (err, row) => {
        !err ? resolve(row) : reject(err)
      })
    })
};
