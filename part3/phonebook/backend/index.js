const express = require('express')
const cors = require('cors')
//const morgan = require('morgan')
require('dotenv').config()

const Phone = require('./models/number')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

// morgan.token('body', function getBody (req, res) { return JSON.stringify(req.body) })
// app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

app.get('/info', (request, response) => {
  Phone.find({}).then(phones => {
    console.log(phones)
    response.send(`<p>Phonebook has info for ${phones.length} people<p><p>${Date()}<p>`)
  })
})

app.get('/api/persons', (request, response) => {
  Phone.find({}).then(phones => {
    response.json(phones)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then(phone => {
      if (phone) {
        response.json(phone)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Phone.findByIdAndUpdate(
    request.params.id,
    { name: name, number: number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number are missing'
    })
  }

  Phone.find({ name: body.name })
    .then(result => {
      if (result.length === 1) {
        console.log('Already Exists: \n', result)
      }
      else {
        const phone = new Phone({
          name: body.name,
          number: body.number,
        })

        phone.save()
          .then(result => {
            response.json(result)
          })
          .catch(error => next(error))
      }
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted Id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
