const models_facility = require('../models/facility')

module.exports = {
  getData: (req, res) => {
    models_facility.getData()
      .then(result => res.json({ success: true, message: 'succes get data', data: result, error: [''] }))
      .catch(err => res.json({ success: false, message: 'fail get data', data: [''], error: err }))
  },
  getDataDetail: (req, res) => {
    const id = req.params.id
    models_facility.getDetailData(id)
      .then(result => {
        if (result.length === 0) {
          res.json({ success: false, message: 'facility not found', data: id, error: 'cant get data in database' })
        } else {
          res.json({ success: true, message: 'succes get detail data', data: result, error: '' })
        }
      })
      .catch(err => res.json({ success: false, message: 'something wrong', data: id, error: err }))
  },
  deleteData: (req, res) => {
    const id = req.params.id
    models_facility.delete(id)
      .then(result => {
        if (result.affectedRows === 1) {
          res.json({ success: true, message: 'facility deleted', data: id, error: '' })
        } else if (res.status(404)) {
          res.json({ success: false, message: 'facility not found', data: id, error: '' })
        } else {
          res.json({ success: false, message: 'facility can not deleted', data: id, error: '' })
        }
      })
      .catch(err => res.json({ succes: false, message: 'facility can not deleted', data: id, error: err }))
  },
  updateData: (req, res) => {
    const data = {
      facility_name: req.body.facility_name,
      image: req.body.image,
    }
    const id = {
      id: req.params.id
    }
    models_facility.update(data, id)
      .then(result => {
        if (result.affectedRows === 1) {
          res.json({ success: true, message: 'updated facility', data: [id, data], error: '' })
        } else {
          res.json({ success: false, message: 'cant update facility', data: [id, data], error: 'cant get in database' })
        }
      })
      .catch(err => res.json({ success: false, message: 'cant update facility', data: [id, data], error: err }))
  },
  insertData: (req, res) => {
    const data = {
      facility_name: req.body.facility_name,
      image: req.body.image,
    }
    models_facility.insert(data)
      .then(result => {
        if (result.affectedRows === 1) {
          res.json({ success: true, message: 'added facility', data: data, error: '' })
        } else {
          res.json({ success: false, message: 'cant added facility', data: data, error: 'cant get data in database' })
        }
      })
      .catch(err => res.json({ success: false, message: 'cant added facility', data: data, error: err }))
  }
}
