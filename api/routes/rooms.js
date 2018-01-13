const express = require('express')
const Room = require('../models/Room')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

router.get('/rooms', requireJWT, (req, res) => {
  Room.find()
    .then(rooms => {
      res.json(rooms)
    })
    .catch(error => {
      res.json({ error })
    })
})

router.post('/rooms', requireJWT, (req, res) => {
  Room.create(req.body)
    .then(room => {
      res.status(201).json(room)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

router.put('/rooms/:id', requireJWT, (req, res) => {
  const { id } = req.params
  Room.findByIdAndUpdate(id, {
    $addToSet: {
      bookings: {
        user: req.user,
        businessUnit: req.body.businessUnit,
        purpose: req.body.purpose
      }
    }
  })
    .then(room => {
      res.status(201).json({ room: room.bookings })
    })
    .catch(error => {
      console.log('User id', req.body.user)
      res.status(400).json({ error })
    })
})

module.exports = router
