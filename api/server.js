if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// const authMiddleware = require('./middleware/auth')

const server = express()

// Middleware
server.use(bodyParser.json())
server.use(cors())
server.use(authMiddlewar.initialize)

// Routes
server.use([require('./routes/index')])

// Error handling
server.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting', error)
  } else {
    console.log('Server started at http://localhost:7000');
  }
})