require('dotenv').config()
const redis = require('redis')
const url = process.env.REDISCLOUD_URL
console.log(url)
const client = redis.createClient({url})
// const client = url ? redis.createClient({url}) : redis.createClient(6379)
client.on("error", err => {
    console.log("Error " + err);
});
module.exports=client
