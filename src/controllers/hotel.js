const models_hotel = require('../models/hotel')
const helper = require('../middleware/helpers')

module.exports = {
  getData: (req, res) => {
    models_hotel.getData()
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
    models_hotel.getDetailData(id)
      .then(result => {
        if (result.length === 0) {
          const resData = { success: false, message: 'hotel not found', data: id, error: 'cant get data in database' }
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
    models_hotel.delete(id)
      .then(result => {
        if (result.affectedRows === 1) {
          models_hotel.getData()
          const resData = { success: true, message: 'hotel deleted', data: id, error: '' }
          helper.response(res, resData, 200, '')
        } else if (res.status(404)) {
          const resData = { success: false, message: 'hotel not found', data: id, error: '' }
          helper.response(res, resData, 404, '')
        } else {
          const resData = { success: false, message: 'hotel can not deleted', data: id, error: '' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { succes: false, message: 'hotel can not deleted', data: id, error: err }
        helper.response(res, resData, 500, err)
      })
  },
  updateData: (req, res) => {
    const data = req.body
    // const data = {
    //   user_id: req.body.user_id,
    //   hotel_name: req.body.hotel_name,
    //   city: req.body.city,
    //   address: req.body.address,
    //   zipcode: req.body.zipcode,
    //   latitude: req.body.latitude,
    //   longitude: req.body.longitude,
    //   phone: req.body.phone,
    //   image: req.body.image,
    //   rate: req.body.rate || 0,
    // }
    const id = {
      id: req.params.id
    }
    models_hotel.update(data, id)
      .then(result => {
        if (result.affectedRows === 1) {
          models_hotel.getData()
          const resData = { success: true, message: 'updated hotel', data: [id, data], error: '' }
          helper.response(res, resData, 200, '')
        } else {
          const resData = { success: false, message: 'cant update hotel', data: [id, data], error: 'cant get in database' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'cant update hotel', data: [id, data], error: err }
        helper.response(res, resData, 500, err)
      })
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
          models_hotel.getData()
          const resData = { success: true, message: 'added hotel', data: data, error: '' }
          helper.response(res, resData, 200, '')
        } else {
          const resData = { success: false, message: 'cant added hotel', data: data, error: 'cant add data in database' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'cant added hotel', data: data, error: err }
        helper.response(res, resData, 500, '')
      })
  }
}
