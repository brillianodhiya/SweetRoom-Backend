const express = require('express')
const Route = express.Router()

const Conttroller = require('../controllers/facility')
const redis = require('../middleware/redis')
const Auth = require('../middleware/auth')

Route
  .all('/*', Auth)
// check auth
  // .get('/*', auth.auth)
//   .post('/*', auth.auth, auth.authAdmin)
//   .patch('/*', auth.auth, auth.authAdmin)
//   .delete('/*', auth.auth, auth.authAdmin)
// get all facility
  .get('/', redis.cacheGetAllFacility, Conttroller.getData)
// get specific facility by id
  .get('/:id', Conttroller.getDataDetail)
// add facility
  .post('/', Conttroller.insertData)
// update facility
  .patch('/:id', Conttroller.updateData)
// delete facility
  .delete('/:id', Conttroller.deleteData)

module.exports = Route
