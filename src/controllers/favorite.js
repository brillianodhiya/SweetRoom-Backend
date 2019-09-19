const models_hotel = require('../models/hotel')
const models_favorite = require('../models/favorite')
const helper = require('../middleware/helpers')

module.exports = {
  getData: (req, res) => {
    models_favorite.getData()
      .then(result => {
        const resData = { success: true, message: 'succes get data', data: result, error: [''] }
        helper.response(res, resData, 200, '')
      })
      .catch(err => {
        const resData = { success: false, message: 'fail get data', data: [''], error: err }
        helper.response(res, resData, 500, '')
      })
  },
  getDataDetail: (req, res) => {
    const id = req.params.id
    models_favorite.getDetailData(id)
      .then(result => {
        if (result.length === 0) {
          const resData = { success: false, message: 'favorite not found', data: id, error: 'cant get data in database' }
          helper.response(res, resData, 404, '')
        } else {
          const resData = { success: true, message: 'succes get detail data', data: result, error: '' }
          helper.response(res, resData, 200, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'something wrong', data: id, error: err }
        helper.response(res, resData, 500, '')
      })
  },
  deleteData: (req, res) => {
    const id = req.params.id
    models_favorite.delete(id)
      .then(result => {
        if (result.affectedRows === 1) {
          models_favorite.getData()
          const resData = { success: true, message: 'favorite deleted', data: id, error: '' }
          helper.response(res, resData, 200, '')
        } else if (res.status(404)) {
          const resData = { success: false, message: 'favorite not found', data: id, error: '' }
          helper.response(res, resData, 404, '')
        } else {
          const resData = { success: false, message: 'favorite can not deleted', data: id, error: '' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { succes: false, message: 'favorite can not deleted', data: id, error: err }
        helper.response(res, resData, 500, '')
      })
  },
  updateData: (req, res) => {
    const data = req.body
    const user_id = {user_id : req.body.user_id}
    const hotel_id = {hotel_id : req.body.hotel_id}
    models_favorite.update(data, user_id, hotel_id)
      .then(result => {
        if (result.affectedRows === 1) {
          models_favorite.getData()
          const resData = { success: true, message: 'updated favorite', data: [user_id, data], error: '' }
          helper.response(res, resData, 200, '')
        } else {
          const resData = { success: false, message: 'cant update favorite', data: [user_id, data], error: 'cant get in database' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'cant update favorite', data: [user_id, data], error: err }
        helper.response(res, resData, 500, '')
      })
  },
  insertData: (req, res) => {
    const data = {
      user_id: req.body.user_id,
      hotel_id: req.body.hotel_id,
      favorite: req.body.favorite || 0,
    }
    models_favorite.insert(data)
      .then(result => {
        if (result.affectedRows === 1) {
          models_favorite.getData()
          const resData = { success: true, message: 'added favorite', data: data, error: '' }
          helper.response(res, resData, 200, '')
        } else {
          const resData = { success: false, message: 'cant added favorite', data: data, error: 'cant get data in database' }
          helper.response(res, resData, 404, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'cant added favorite', data: data, error: err }
        helper.response(res, resData, 500, '')
      })
  }
}
