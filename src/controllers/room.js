const models_room = require('../models/room')

module.exports = {
  getData: (req, res) => {
    models_room.getData()
      .then(result => res.json({ success: true, message: 'succes get data', data: result, error: [''] }))
      .catch(err => res.json({ success: false, message: 'fail get data', data: [''], error: err }))
  },
  getDataDetail: (req, res) => {
    const id = req.params.id
    models_room.getDetailData(id)
      .then(result => {
        if (result.length === 0) {
          res.json({ success: false, message: 'room not found', data: id, error: 'cant get data in database' })
        } else {
          res.json({ success: true, message: 'succes get detail data', data: result, error: '' })
        }
      })
      .catch(err => res.json({ success: false, message: 'something wrong', data: id, error: err }))
  },
  deleteData: (req, res) => {
    const id = req.params.id
    models_room.delete(id)
      .then(result => {
        if (result.affectedRows === 1) {
          res.json({ success: true, message: 'room deleted', data: id, error: '' })
        } else if (res.status(404)) {
          res.json({ success: false, message: 'room not found', data: id, error: '' })
        } else {
          res.json({ success: false, message: 'room can not deleted', data: id, error: '' })
        }
      })
      .catch(err => res.json({ succes: false, message: 'room can not deleted', data: id, error: err }))
  },
  updateData: (req, res) => {
    const data = req.body
    const id = {
      id: req.params.id
    }
    models_room.update(data, id)
      .then(result => {
        if (result.affectedRows === 1) {
          res.json({ success: true, message: 'updated room', data: [id, data], error: '' })
        } else {
          res.json({ success: false, message: 'cant update room', data: [id, data], error: 'cant get in database' })
        }
      })
      .catch(err => res.json({ success: false, message: 'cant update room', data: [id, data], error: err }))
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
          res.json({ success: true, message: 'added room', data: data, error: '' })
        } else {
          res.json({ success: false, message: 'cant added room', data: data, error: 'cant get data in database' })
        }
      })
      .catch(err => res.json({ success: false, message: 'cant added room', data: data, error: err }))
  }
}
