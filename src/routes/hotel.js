const express = require('express')
const Route = express.Router()

const Conttroller = require('../controllers/hotel')
const redis = require('../middleware/redis')
// const auth = require('../middleware/auth')

Route
// check auth
  // .get('/*', auth.auth)
//   .post('/*', auth.auth, auth.authAdmin)
//   .patch('/*', auth.auth, auth.authAdmin)
//   .delete('/*', auth.auth, auth.authAdmin)
// get all hotel
  .get('/', redis.cacheGetAllHotel, Conttroller.getData)
// get specific hotel by id
  .get('/:id', Conttroller.getDataDetail)
// add hotel
  .post('/', Conttroller.insertData)
// update hotel
  .patch('/:id', Conttroller.updateData)
// delete hotel
  .delete('/:id', Conttroller.deleteData)

module.exports = Route
