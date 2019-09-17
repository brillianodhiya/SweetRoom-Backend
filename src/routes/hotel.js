const express = require('express')
const Route = express.Router()

const Conttroller = require('../controllers/hotel')
// const auth = require('../middleware/auth')

Route
// check auth
  // .get('/*', auth.auth)
//   .post('/*', auth.auth, auth.authAdmin)
//   .patch('/*', auth.auth, auth.authAdmin)
//   .delete('/*', auth.auth, auth.authAdmin)
// get all genre
  .get('/', Conttroller.getData)
// get specific genre by id
  .get('/:id', Conttroller.getDataDetail)
// add genre
  .post('/', Conttroller.insertData)
// update genre
  .patch('/:id', Conttroller.updateData)
// delete genre
  .delete('/:id', Conttroller.deleteData)

module.exports = Route
