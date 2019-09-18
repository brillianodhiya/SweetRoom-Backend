const models_facility = require('../models/facility')
const helper = require('../middleware/helpers')

module.exports = {
  getData: (req, res) => {
    models_facility.getData()
      .then(result => {
        const resData = { success: true, message: 'succes get data', data: result }
        helper.response(res, resData, 200, '')
      })
      .catch(err => {
        const resData = { success: false, message: 'fail get data', data: [''] }
        helper.response(res, resData, 401, err)
      })
  },
  getDataDetail: (req, res) => {
    const id = req.params.id
    models_facility.getDetailData(id)
      .then(result => {
        if (result.length === 0) {
          const resData = { success: false, message: 'facility not found', data: id, error: 'cant get data in database' }
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
    models_facility.delete(id)
      .then(result => {
        if (result.affectedRows === 1) {
          const resData = { success: true, message: 'facility deleted', data: id, error: '' }
          models_facility.getData()
          helper.response(res, resData, 200, '')
        } else if (res.status(404)) {
          const resData = { success: false, message: 'facility not found', data: id, error: '' }
          helper.response(res, resData, 404, '')
        } else {
          const resData = { success: false, message: 'facility can not deleted', data: id, error: '' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { succes: false, message: 'facility can not deleted', data: id, error: err }
        helper.response(res, resData, 500, err)
      })
  },
  updateData: (req, res) => {
    const data = req.body
    // const data = {
    //   facility_name: req.body.facility_name,
    //   image: req.body.image,
    // }
    const id = {
      id: req.params.id
    }
    models_facility.update(data, id)
      .then(result => {
        if (result.affectedRows === 1) {
          const resData = { success: true, message: 'updated facility', data: [id, data], error: '' }
          models_facility.getData()
          helper.response(res, resData, 200, '')
        } else {
          const resData = { success: false, message: 'cant update facility', data: [id, data], error: 'cant get in database' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const resData = { success: false, message: 'cant update facility', data: [id, data], error: err }
        helper.response(res, resData, 500, err)
      })
  },
  insertData: (req, res) => {
    const reqData = {
      facility_name: req.body.facility_name,
      image: req.body.image,
    }
    models_facility.insert(reqData)
      .then(result => {
        if (result.affectedRows === 1) {
          const resData = { success: true, message: 'added facility', data: reqData, error: '' }
          models_facility.getData()
          helper.response(res, resData, 200, '')
        } else {
          const resData = { success: false, message: 'cant added facility', data: reqData, error: 'cant get data in database' }
          helper.response(res, resData, 401, '')
        }
      })
      .catch(err => {
        const data = { success: false, message: 'error server', data: reqData, error: err }
        helper.response(res, data, 500, err)
      })
  }
}
