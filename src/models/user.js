const conn = require('../config/dbconfig')

module.exports = {
    findUserByEmail: (email) => new Promise((resolve, reject) => {
        conn.query('SELECT * FROM user WHERE email = ?', [email], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    }),
    createUser: (user) => new Promise((resolve, reject) => {
        conn.query('INSERT INTO user (first_name, last_name, email, password, birth, photo, level, longitude, latitude, firebase_id) VALUES (?,?,?,?,?,?,?,?,?,?)', user, (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    })
} 