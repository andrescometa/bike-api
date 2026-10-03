let mongoose = require('mongoose')
let Schema = mongoose.Schema

let BikeSchema = Schema({
  brand: String,
  model: String,
  year: Number,
  engineCc: Number,
  riders: [{ name: String, team: String }]
})

module.exports = mongoose.model('Bike', BikeSchema, 'bike')