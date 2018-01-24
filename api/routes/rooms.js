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

// Make a booking
router.put('/rooms/:id', requireJWT, (req, res) => {
  const { id } = req.params

  // If the recurring array is empty, the booking is not recurring
  if (req.body.recurring.length === 0) {
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
      { new: true, runValidators: true, context: 'query' }
    )
      .then(room => {
        res.status(201).json(room)
      })
      .catch(error => {
        res.status(400).json({ error })
      })
  // If the booking is a recurring daily booking
  } else if (req.body.recurring[1] === 'daily') {
    
    // The first booking in the recurring booking range
    let firstBooking = req.body
    firstBooking.startHour = dateAEST(req.body.bookingStart).format('H.mm')
    firstBooking.duration = durationHours(req.body.bookingStart, req.body.bookingEnd)
    firstBooking.user = req.user    
    
    // An array containing the first booking and for all remaining bookings to be added to
    let recurringBookings = [ firstBooking ]
    
    // A moment object to track each date in the recurring range, initialised with the first date
    let bookingDateTracker = moment(firstBooking.bookingStart)
    
    // A Moment date object for the final booking date in the recurring booking range
    let lastBookingDate = moment(firstBooking.recurring[0])
    
    // The number of days in the recurring booking date range
    let daysInRange = lastBookingDate.diff(bookingDateTracker, 'days', true)

    // Each loop will represent a day (i.e. a potential booking) in this range 
    for (let i = 0; i < Math.ceil(daysInRange); i++) {
      
      // Add one day to the booking tracker to get the date of the potential booking
      let proposedBookingDateStart = bookingDateTracker.add(1, 'd')
    
      // Check whether this day is a weekday (no bookings on weekends)
      if (proposedBookingDateStart.day() !== 6 && proposedBookingDateStart.day() !== 0) {
        
        // Create a new booking object based on the first booking 
        let newBooking = Object.assign({}, firstBooking)
        
        // Calculate the end date of the new booking
        let firstBookingEndDate = moment(firstBooking.bookingEnd)
        let proposedBookingDateEnd = firstBookingEndDate.add(i + 1, 'd')
        
        // Update the new booking object's start and end dates
        newBooking.bookingStart = proposedBookingDateStart.toDate()
        newBooking.bookingEnd = proposedBookingDateEnd.toDate()
        
        // Add the new booking to the recurring booking array
        recurringBookings.push(newBooking)
      }
    }
    

    // Find the relevant room and save the bookings
    Room.findByIdAndUpdate(
      id,
      {
        $push: {
          bookings: {
            $each:
            recurringBookings
          }
        }
      },
      { new: true, runValidators: true, context: 'query' }
    )
      .then(room => {
        res.status(201).json(room)
      })
      .catch(error => {
        res.status(400).json({ error })
      })
  }
})

// Delete a booking
router.delete('/rooms/:id/:bookingId', requireJWT, (req, res) => {
  const { id } = req.params
  const { bookingId } = req.params
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
