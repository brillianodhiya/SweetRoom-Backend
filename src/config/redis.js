require('dotenv').config()
const redis = require('redis')
const url = process.env.REDISCLOUD_URL
console.log(url != undefined)
const client = url != undefined ? redis.createClient({url}) : redis.createClient(6379)
client.on("error", err => {
    console.log("Error " + err);
});
module.exports=client
