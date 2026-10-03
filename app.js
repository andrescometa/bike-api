const express = require('express')
const bike_routes = require('./routes/bike')

const app = express()

// settings
app.set('port', process.env.PORT || 3000)

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/bikes', bike_routes)

module.exports = app