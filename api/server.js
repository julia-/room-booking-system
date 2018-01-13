if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config')
const authMiddleware = require('./middleware/auth')

const server = express()

// Middleware
server.use(bodyParser.json())
server.use(cors())
server.use(authMiddleware.initialize)

// Routes
server.use(require('./routes/auth'))

// Error handling
server.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

// Read port and host from the configuration file
server.listen(config.port, config.host, () => {
  console.info('Express listening on port ', config.port)
})
