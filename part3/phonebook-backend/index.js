require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// Define a custom token for logging the request body
morgan.token('type', (req, res) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})

// Use the Morgan middleware with the custom token
app.use(morgan(':method :url :status :response-time ms - :type'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

let persons = []

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people<br>${Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  Person.find().then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if(persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const generateId = (max) => {
        return Math.floor(Math.random() * max)
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(Number.MAX_SAFE_INTEGER),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})