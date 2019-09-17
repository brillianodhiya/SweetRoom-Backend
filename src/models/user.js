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
    }),
    findUserById: (id) => new Promise((resolve, reject) => {
        conn.query('SELECT * FROM user WHERE id = ?', [id], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    }),
    deleteUser: (id) => new Promise((resolve, reject) => {
        conn.query('DELETE FROM user WHERE id = ?', [id], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    }),
    updateUser: (id, data) => new Promise((resolve, reject) => {
        conn.query('UPDATE user SET ? WHERE id = ?', [data, id], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    }),
    searchMitra: (search) => new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM user WHERE level = 'mitra'` , [search], (err, row) => {
            !err ? resolve(row) : reject(err)
        })
    })
} 
