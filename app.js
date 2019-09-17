require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

// const userRoute = require('./src/routes/userRoute')
const facilityRoute = require('./src/routes/facility')
const hotelRoute = require('./src/routes/hotel')

const app = express()
const PORT = process.env.PORT || 1010

app.use(cors())

app.listen(PORT, () => {
    console.log('Server is running on PORT ' + PORT)
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// app.use('/user', userRoute)
app.use('/facility', facilityRoute)
app.use('/hotel', hotelRoute)
app.use('/', (req, res) => res.status(404).json({ message: '404 not found' }))
