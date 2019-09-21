const express = require('express')
const Route = express.Router()

const Conttroller = require('../controllers/hotel')
const redis = require('../middleware/redis')
const Auth = require('../middleware/auth')

Route
// check auth
//   .all('/*', Auth)
//   .get('/*', Auth)
//   .post('/*', Auth)
//   .patch('/*', Auth)
//   .delete('/*', Auth)
// get all hotel
  .get('/', redis.cacheGetAllHotel, Conttroller.getData)
  .get('/data/4', redis.cacheGetAllHotel4, Conttroller.getData4)
// get specific hotel by id
  .get('/:id', Conttroller.getDataDetail)
  .get('/mitra/:id', Conttroller.getDataMitra)
// add hotel
  .post('/', Conttroller.insertData)
// update hotel
  .patch('/:id', Conttroller.updateData)
// delete hotel
  .delete('/:id', Conttroller.deleteData)
  .get('/search/:keyword', Conttroller.getDataDetailbyCity)
  .get('/searchrate/:keyword', Conttroller.getDataDetailbyRate)

module.exports = Route
