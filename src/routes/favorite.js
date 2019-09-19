const express = require('express')
const Route = express.Router()

const Conttroller = require('../controllers/favorite')
const redis = require('../middleware/redis')
const Auth = require('../middleware/auth')

Route
// check auth
//   .get('/*', auth.auth)
//   .post('/*', auth.auth, auth.authAdmin)
//   .patch('/*', auth.auth, auth.authAdmin)
//   .delete('/*', auth.auth, auth.authAdmin)
// get all favorite
  .get('/', redis.cacheGetAllFavorite, Conttroller.getData)
// get specific favorite by id
  .get('/:id', Conttroller.getDataDetail)
// add favorite
  .post('/', Conttroller.insertData)
// update favorite
  .patch('/:id', Conttroller.updateData)
// delete favorite
  .delete('/:id', Conttroller.deleteData)

module.exports = Route
