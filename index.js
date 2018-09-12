const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(cors())

morgan.token('data', function (req, res) {
  return JSON.stringify(req.body)
})

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons.map(Person.format))
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(Person.format(person))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'missing name'
    })
  }

  if (body.number === undefined) {
    return response.status(400).json({
      error: 'missing number'
    })
  }

  Person
    .find({ name: body.name })
    .then(result => { 
      if (result.length > 0) {
        return response.status(400).json({
          error: 'name must be unique'
        })
      } else {
        const person = new Person({
          name: body.name,
          number: body.number
        })
      
        person
          .save()
          .then(savedPerson => {
            response.json(Person.format(savedPerson))
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updatePerson => {
      response.json(Person.format(updatePerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.get('/info', (request, response) => {
  Person
    .find({})
    .then(result => {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.write('puhelinluettelossa ' + result.length + ' henkilön tiedot<br/><br/>' + Date())
      response.end();
    })
    .catch(error => {
      response.status(400).send({ error: 'Error querying database' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})