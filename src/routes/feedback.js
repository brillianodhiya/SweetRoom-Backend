const express = require('express')
const Route = express.Router()

const Conttroller = require('../controllers/feedback')
const redis = require('../middleware/redis')
const Auth = require('../middleware/auth')

Route
// check auth
//   .get('/*', auth.auth)
//   .post('/*', auth.auth, auth.authAdmin)
//   .patch('/*', auth.auth, auth.authAdmin)
//   .delete('/*', auth.auth, auth.authAdmin)
// get all feedback
  .get('/', redis.cacheGetAllFeedback, Conttroller.getData)
// get specific feedback by id
  .get('/:id', Conttroller.getDataDetail)
// add feedback
  .post('/', Conttroller.insertData)
// update feedback
  .patch('/:id', Conttroller.updateData)
// delete feedback
  .delete('/:id', Conttroller.deleteData)

module.exports = Route
