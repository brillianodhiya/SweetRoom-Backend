require('dotenv').config()
const redis = require('redis')
const url = require('url')
const redisUrl = url.parse(process.env.REDISCLOUD_URL)
console.log(redisUrl)
const client = redis.createClient(redisUrl.port, redisUrl.hostname, {no_ready_check: true})
client.auth(redisUrl.auth.split(":")[1])
// const client = url ? redis.createClient({url}) : redis.createClient(6379)
module.exports=client
