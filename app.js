require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const xssFilter = require('x-xss-protection')

const userRoute = require('./src/routes/user')

const app = express()
const PORT = process.env.PORT || 0101

app.use(cors())
app.use(xssFilter())

app.listen(PORT, () => {
    console.log('Server is running on PORT ' + PORT)
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/user', userRoute)
