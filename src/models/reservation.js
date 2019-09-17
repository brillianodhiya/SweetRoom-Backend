const conn = require('../config/dbconfig')

module.exports = {
    actionReservation: (data) => new Promise((resolve, reject) => {
        conn.query('INSERT INTO hotel_reservation (hotel_id, user_id, invoice, reservation_date, num_people, bed_type, room_number, price, plan_checkin, plan_checkout) VALUES (?,?,?,?,?,?,?,?,?,?)', data, (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    }),
    actionCheck: (id, data) => new Promise((resolve, reject) => {
        conn.query('UPDATE hotel_reservation SET ? WHERE id = ?', [data, id], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    }),
    actionFindReservation: (id) => new Promise((resolve, reject) => {
        conn.query('SELECT * FROM hotel_reservation WHERE id = ?', [id], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    }),
    actionFindReservByUser: (user_id) => new Promise((resolve, reject) => {
        conn.query('SELECT * FROM hotel_reservation WHERE user_id = ?', [user_id], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    }),
    actionFindReservByPlace: (hotel_id) => new Promise((resolve, reject) => {
        conn.query('SELECT * FROM hotel_reservation WHERE hotel_id = ?', [hotel_id], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    }),
    actionDeleteReservation: (id) => new Promise((resolve, reject) => {
        conn.query('DELETE FROM hotel_reservation WHERE id = ?', [id], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    })
}