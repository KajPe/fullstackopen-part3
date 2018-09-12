const mongoose = require('mongoose')
const config = require('../config')

// Get database url from config file
const dburl = config.database.url;

// Connect to mongodb
mongoose.connect(dburl, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.statics.format = function(cb) {
  return {
    name: cb.name,
    number: cb.number,
    id: cb._id
  }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person