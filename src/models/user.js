const conn = require('../config/dbconfig')

module.exports = {
    findUserByEmail: (email) => new Promise((resolve, reject) => {
        conn.query('SELECT * FROM user WHERE email = ?', [email], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    }),
    createUser: (user) => new Promise((resolve, reject) => {
        conn.query('INSERT INTO user (first_name, last_name, email, password, birth) VALUES (?,?,?,?,?)', user, (err, result) => {
            !err ? resolve(row) : reject(err)
        })
    })
} 