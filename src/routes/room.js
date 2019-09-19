const express = require('express')
const Route = express.Router()

const Conttroller = require('../controllers/room')
const redis = require('../middleware/redis')
const Auth = require('../middleware/auth')

Route
// check auth
  // .get('/*', auth.auth)
//   .post('/*', auth.auth, auth.authAdmin)
//   .patch('/*', auth.auth, auth.authAdmin)
//   .delete('/*', auth.auth, auth.authAdmin)
// get all room
  .get('/', redis.cacheGetAllRoom, Conttroller.getData)
// get specific room by id
  .get('/:id', Conttroller.getDataDetail)
// add room
  .post('/', Conttroller.insertData)
// update room
  .patch('/:id', Conttroller.updateData)
// delete room
  .delete('/:id', Conttroller.deleteData)

module.exports = Route
