const express = require('express')
const moment = require('moment')
const momentTimezone = require('moment-timezone')
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

// Function to convert UTC JS Date object) to a Moment.js object in AEST
const dateAEST = date => {
  return momentTimezone(date).tz('Australia/Sydney')
}

// Function to calculate the duration of the hours between the start and end of the booking
const durationHours = (bookingStart, bookingEnd) => {
  // convert the UTC Date objects to Moment.js objeccts
  let startDateLocal = dateAEST(bookingStart)
  let endDateLocal = dateAEST(bookingEnd)
  // calculate the duration of the difference between the two times
  let difference = moment.duration(endDateLocal.diff(startDateLocal))
  // return the difference in decimal format
  return difference.hours() + difference.minutes() / 60
}

router.put('/rooms/:id', requireJWT, (req, res) => {
  const { id } = req.params
  Room.findByIdAndUpdate(
    id, 
    {
      $addToSet: {
        bookings: {
          user: req.user,
          // The hour on which the booking starts, calculated from 12:00AM as time = 0
          startHour: dateAEST(req.body.bookingStart).format('H.mm'),
          // The duration of the booking in decimal format
          duration: durationHours(req.body.bookingStart, req.body.bookingEnd),
          // Spread operator for remaining attributes
          ...req.body
        }
      }
    },
    { new: true }
  )
    .then(room => {
      res.status(201).json(room)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

// Delete a booking
router.delete('/rooms/:id', requireJWT, (req, res) => {
  const { id } = req.params
  const bookingId = req.body.id
  Room.findByIdAndUpdate(
    id,
    { $pull: { bookings: { _id: bookingId } } },
    { new: true }
  )
    .then(room => {
      res.status(201).json(room)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

module.exports = router
