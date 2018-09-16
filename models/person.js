const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const dburl = process.env.MONGODB_URI

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