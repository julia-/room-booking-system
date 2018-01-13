const express = require('express')
const Room = require('../models/Room')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

router.get('/rooms', authMiddleware.requireJWT, (req, res) => {
  Room.find()
    .then(rooms => {
      res.json(rooms)
    })
    .catch(error => {
      res.json({ error })
    })
})

router.post('/rooms', authMiddleware.requireJWT, (req, res) => {
  Room.create(req.body)
    .then((room) => {
      res.status(201).json(room)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

router.put('/rooms/:id', authMiddleware.requireJWT, (req, res) => {
  const { id } = req.params

  Room.findByIdAndUpdate(id, req.body, {new: true})
    .then(room => {
      room.bookings.push(req.body)
      res.status(201).json(room.bookings)
    })
    .catch(error => {
      console.log('User id', req.body.user)
      res.status(400).json({ error })
    })
})

module.exports = router