require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const xssFilter = require('x-xss-protection')

const userRoute = require('./src/routes/user')
const facilityRoute = require('./src/routes/facility')
const hotelRoute = require('./src/routes/hotel')
const roomRoute = require('./src/routes/room')
const feedbackRoute = require('./src/routes/feedback')

const app = express()
const PORT = process.env.PORT || 1010

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
app.use('/facility', facilityRoute)
app.use('/hotel', hotelRoute)
app.use('/room', roomRoute)
app.use('/feedback', feedbackRoute)
app.use('/', (req, res) => res.status(404).json({ message: '404 not found' }))
