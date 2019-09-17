const models_hotel = require('../models/hotel')

module.exports = {
  getData: (req, res) => {
    models_hotel.getData()
      .then(result => res.json({ success: true, message: 'succes get data', data: result, error: [''] }))
      .catch(err => res.json({ success: false, message: 'fail get data', data: [''], error: err }))
  },
  getDataDetail: (req, res) => {
    const id = req.params.id
    models_hotel.getDetailData(id)
      .then(result => {
        if (result.length === 0) {
          res.json({ success: false, message: 'hotel not found', data: id, error: 'cant get data in database' })
        } else {
          res.json({ success: true, message: 'succes get detail data', data: result, error: '' })
        }
      })
      .catch(err => res.json({ success: false, message: 'something wrong', data: id, error: err }))
  },
  deleteData: (req, res) => {
    const id = req.params.id
    models_hotel.delete(id)
      .then(result => {
        if (result.affectedRows === 1) {
          res.json({ success: true, message: 'hotel deleted', data: id, error: '' })
        } else if (res.status(404)) {
          res.json({ success: false, message: 'hotel not found', data: id, error: '' })
        } else {
          res.json({ success: false, message: 'hotel can not deleted', data: id, error: '' })
        }
      })
      .catch(err => res.json({ succes: false, message: 'hotel can not deleted', data: id, error: err }))
  },
  updateData: (req, res) => {
    const data = {
      user_id: req.body.user_id,
      hotel_name: req.body.hotel_name,
      city: req.body.city,
      address: req.body.address,
      zipcode: req.body.zipcode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      phone: req.body.phone,
      image: req.body.image,
      rate: req.body.rate || 0,
    }
    const id = {
      id: req.params.id
    }
    models_hotel.update(data, id)
      .then(result => {
        if (result.affectedRows === 1) {
          res.json({ success: true, message: 'updated hotel', data: [id, data], error: '' })
        } else {
          res.json({ success: false, message: 'cant update hotel', data: [id, data], error: 'cant get in database' })
        }
      })
      .catch(err => res.json({ success: false, message: 'cant update hotel', data: [id, data], error: err }))
  },
  insertData: (req, res) => {
    const data = {
      user_id: req.body.user_id,
      hotel_name: req.body.hotel_name,
      city: req.body.city,
      address: req.body.address,
      zipcode: req.body.zipcode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      phone: req.body.phone,
      image: req.body.image,
      rate: req.body.rate || 0,
    }
    models_hotel.insert(data)
      .then(result => {
        if (result.affectedRows === 1) {
          res.json({ success: true, message: 'added hotel', data: data, error: '' })
        } else {
          res.json({ success: false, message: 'cant added hotel', data: data, error: 'cant get data in database' })
        }
      })
      .catch(err => res.json({ success: false, message: 'cant added hotel', data: data, error: err }))
  }
}
