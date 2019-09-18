const models_feedback = require('../models/feedback')
const helper = require('../middleware/helpers')

module.exports = {
  getData: (req, res) => {
    models_feedback.getData()
      .then(result => res.json({ success: true, message: 'succes get data', data: result, error: [''] }))
      .catch(err => res.json({ success: false, message: 'fail get data', data: [''], error: err }))
  },
  getDataDetail: (req, res) => {
    const id = req.params.id
    models_feedback.getDetailData(id)
      .then(result => {
        if (result.length === 0) {
          res.json({ success: false, message: 'feedback not found', data: id, error: 'cant get data in database' })
        } else {
          res.json({ success: true, message: 'succes get detail data', data: result, error: '' })
        }
      })
      .catch(err => res.json({ success: false, message: 'something wrong', data: id, error: err }))
  },
  deleteData: (req, res) => {
    const id = req.params.id
    models_feedback.delete(id)
      .then(result => {
        if (result.affectedRows === 1) {
          models_feedback.getData()
          res.json({ success: true, message: 'feedback deleted', data: id, error: '' })
        } else if (res.status(404)) {
          res.json({ success: false, message: 'feedback not found', data: id, error: '' })
        } else {
          res.json({ success: false, message: 'feedback can not deleted', data: id, error: '' })
        }
      })
      .catch(err => res.json({ succes: false, message: 'feedback can not deleted', data: id, error: err }))
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
          res.json({ success: true, message: 'updated feedback', data: [id, data], error: '' })
        } else {
          res.json({ success: false, message: 'cant update feedback', data: [id, data], error: 'cant get in database' })
        }
      })
      .catch(err => res.json({ success: false, message: 'cant update feedback', data: [id, data], error: err }))
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
          models_feedback.getData()
          res.json({ success: true, message: 'added feedback', data: data, error: '' })
        } else {
          res.json({ success: false, message: 'cant added feedback', data: data, error: 'cant get data in database' })
        }
      })
      .catch(err => res.json({ success: false, message: 'cant added feedback', data: data, error: err }))
  }
}
