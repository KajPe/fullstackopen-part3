const mongoose = require('mongoose')
const config = require('../config')

// Get database url from config file
const dburl = config.database.url;

// Connect to mongodb
mongoose.connect(dburl, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person