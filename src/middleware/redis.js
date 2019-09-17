require('dotenv').config()

const MiscHelper = require('./helpers')
const redis = require('redis')
const REDIS_PORT = process.env.REDIS_PORT || 6379
const client = redis.createClient(REDIS_PORT)

// module.exports = {
//     cache
// }