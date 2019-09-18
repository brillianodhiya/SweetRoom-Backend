const conn = require('../config/dbconfig')
const client = require('../config/redis')
const sql = ""
module.exports = {
  insert: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT hotel SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  update: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE hotel SET ? WHERE ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM hotel WHERE id = ?', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getData: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM `hotel` ORDER BY id ASC', (err, result) => {
        if (!err) {
          const data = { success: true, message: 'succes get data', data: result }
          client.setex('getHotel', 3600, JSON.stringify(data))
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getDetailData: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM `hotel` WHERE id = ? ', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}