const mongoose = require('mongoose')
const config = require('./config')

// Get database url from config file
const dburl = config.database.url;

// Connect to mongodb
mongoose.connect(dburl, { useNewUrlParser: true })

// Create model
const Person = mongoose.model('Person', {
    name: String,
    number: String
  })
  
if (process.argv.length == 4) {
    // Add number
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    // Save it
    person
        .save()
        .then(response => {
            console.log('lisätään henkilö ' + process.argv[2] + ' numero ' + process.argv[3] + ' luetteloon')
            mongoose.connection.close()
        })
} else {
    // Show numbers
    console.log('puhelinluettelo:')
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name + ' ' + person.number);
            })
            mongoose.connection.close()
        })
}
