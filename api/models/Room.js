const mongoose = require('./init')
const Schema = mongoose.Schema
const moment = require('moment')

const bookingSchema = new Schema({
  _bookingId: Schema.Types.ObjectId,
  user: { type: Schema.ObjectId, ref: 'User' },
  bookingStart: Date,
  bookingEnd: Date,
  startHour: Number,
  duration: Number,
  recurring: [],
  businessUnit: { type: String, required: true },
  purpose: { type: String, required: true },
  roomId: { type: Schema.ObjectId, ref: 'Room' }
})

// Validation to ensure a room cannot be double-booked
bookingSchema.path('bookingStart').validate(function(value) {
  // Extract the Room Id from the query object
  let roomId = this.roomId
  
  // Convert booking Date objects into a number value
  let newBookingStart = value.getTime()
  let newBookingEnd = this.bookingEnd.getTime()
  
  // Function to check for booking clash
  let clashesWithExisting = (existingBookingStart, existingBookingEnd, newBookingStart, newBookingEnd) => {
    if (newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd || 
      existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd) {
      
      throw new Error(
        `Booking could not be saved. There is a clash with an existing booking from ${moment(existingBookingStart).format('HH:mm')} to ${moment(existingBookingEnd).format('HH:mm on LL')}`
      )
    }
    return false
  }
  
  // Locate the room document containing the bookings
  return Room.findById(roomId)
    .then(room => {
      // Loop through each existing booking and return false if there is a clash
      return room.bookings.every(booking => {
        
        // Convert existing booking Date objects into number values
        let existingBookingStart = new Date(booking.bookingStart).getTime()
        let existingBookingEnd = new Date(booking.bookingEnd).getTime()

        // Check whether there is a clash between the new booking and the existing booking
        return !clashesWithExisting(
          existingBookingStart, 
          existingBookingEnd, 
          newBookingStart, 
          newBookingEnd
        )
      })
    })
}, `{REASON}`)


const roomSchema = new Schema({
  name: { type: String, index: true, required: true },
  floor: { type: String, required: true },
  capacity: Number,
  assets: {
    macLab: { type: Boolean, default: false },
    pcLab: { type: Boolean, default: false },
    projector: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    opWalls: { type: Boolean, default: false },
    whiteBoard: { type: Boolean, default: false }
  },
  bookings: [bookingSchema]
})

const Room = (module.exports = mongoose.model('Room', roomSchema))
