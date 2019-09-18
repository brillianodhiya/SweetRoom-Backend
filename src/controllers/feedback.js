const models_hotel = require('../models/hotel')
const models_feedback = require('../models/feedback')
const helper = require('../middleware/helpers')

module.exports = {
  getData: (req, res) => {
    models_feedback.getData()
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
    models_feedback.getDetailData(id)
      .then(result => {
        if (result.length === 0) {
          const resData = { success: false, message: 'feedback not found', data: id, error: 'cant get data in database' }
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
    models_feedback.delete(id)
      .then(result => {
        if (result.affectedRows === 1) {
          models_feedback.getData()
          const resData = { success: true, message: 'feedback deleted', data: id, error: '' }
          helper.response(res, resData, 200, '')
        } else if (res.status(404)) {
          const resData = { success: false, message: 'feedback not found', data: id, error: '' }
          helper.response(res, resData, 404, '')
        } else {
          const resData = { success: false, message: 'feedback can not deleted', data: id, error: '' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { succes: false, message: 'feedback can not deleted', data: id, error: err }
        helper.response(res, resData, 500, '')
      })
  },
  updateData: (req, res) => {
    const data = req.body
    const id = {
      id: req.params.id
    }
    models_feedback.update(data, id)
      .then(result => {
        if (result.affectedRows === 1) {
          models_feedback.getData()
          const resData = { success: true, message: 'updated feedback', data: [id, data], error: '' }
          helper.response(res, resData, 200, '')
        } else {
          const resData = { success: false, message: 'cant update feedback', data: [id, data], error: 'cant get in database' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'cant update feedback', data: [id, data], error: err }
        helper.response(res, resData, 500, '')
      })
  },
  insertData: (req, res) => {
    const data = {
      user_id: req.body.user_id,
      hotel_id: req.body.hotel_id,
      rating: req.body.rating || 5,
      comment: req.body.comment,
    }
    models_feedback.insert(data)
      .then(result => {
        if (result.affectedRows === 1) {
          const updatedata = { rate: req.body.rating || 5 }
          const id = { id: data.hotel_id }
          models_hotel.update(updatedata, id)
          models_hotel.getData()
          models_feedback.getData()
          const resData = { success: true, message: 'added feedback', data: data, error: '' }
          helper.response(res, resData, 200, '')
        } else {
          const resData = { success: false, message: 'cant added feedback', data: data, error: 'cant get data in database' }
          helper.response(res, resData, 404, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'cant added feedback', data: data, error: err }
        helper.response(res, resData, 500, '')
      })
  }
}
