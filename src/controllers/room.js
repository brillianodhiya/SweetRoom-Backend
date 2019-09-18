const models_room = require('../models/room')
const helper = require('../middleware/helpers')

module.exports = {
  getData: (req, res) => {
    models_room.getData()
      .then(result => {
        const resData = { success: true, message: 'succes get data', data: result, error: [''] }
        helper.response(res, resData, 200, '')
      })
      .catch(err => {
        const resData = { success: false, message: 'fail get data', data: [''], error: err }
        helper.response(res, resData, 500, err)
      })
  },
  getDataDetail: (req, res) => {
    const id = req.params.id
    models_room.getDetailData(id)
      .then(result => {
        if (result.length === 0) {
          const resData = { success: false, message: 'room not found', data: id, error: 'cant get data in database' }
          helper.response(res, resData, 404, '')
        } else {
          const resData = { success: true, message: 'succes get detail data', data: result, error: '' }
          helper.response(res, resData, 200, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'something wrong', data: id, error: err }
        helper.response(res, resData, 500, err)
      })
  },
  deleteData: (req, res) => {
    const id = req.params.id
    models_room.delete(id)
      .then(result => {
        if (result.affectedRows === 1) {
          models_room.getData()
          const resData = { success: true, message: 'room deleted', data: id, error: '' }
          helper.response(res, resData, 200, '')
        } else if (res.status(404)) {
          const resData = { success: false, message: 'room not found', data: id, error: '' }
          helper.response(res, resData, 404, '')
        } else {
          const resData = { success: false, message: 'room can not deleted', data: id, error: '' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { succes: false, message: 'room can not deleted', data: id, error: err }
        helper.response(res, resData, 500, err)
      })
  },
  updateData: (req, res) => {
    const data = req.body
    const id = {
      id: req.params.id
    }
    models_room.update(data, id)
      .then(result => {
        if (result.affectedRows === 1) {
          models_room.getData()
          const resData = { success: true, message: 'updated room', data: [id, data], error: '' }
          helper.response(res, resData, 200, '')
        } else {
          const resData = { success: false, message: 'cant update room', data: [id, data], error: 'cant get in database' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'cant update room', data: [id, data], error: err }
        helper.response(res, resData, 500, err)
      })
  },
  insertData: (req, res) => {
    const data = {
      hotel_id: req.body.hotel_id,
      bed_type: req.body.bed_type,
      image: req.body.image,
      room_number: req.body.room_number,
      price: req.body.price,
      status: req.body.status || 1,
    }
    models_room.insert(data)
      .then(result => {
        if (result.affectedRows === 1) {
          models_room.getData()
          const resData = { success: true, message: 'added room', data: data, error: '' }
          helper.response(res, resData, 200, '')
        } else {
          const resData = { success: false, message: 'cant added room', data: data, error: 'cant get data in database' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'cant added room', data: data, error: err }
        helper.response(res, resData, 500, err)
      })
  }
}
