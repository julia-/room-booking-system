import moment from 'moment'
import momentTimezone from 'moment-timezone'
import api from './init'

// Function to receive booking data (AEST) and convert to JS Date object
// Data expected in [year, month, date, hours, seconds] format
const dateUTC = (dataArray) => {
  // Save as Date object in UTC
  return moment(dataArray).toDate()
}

// Make a room booking
export function makeBooking(data, existingBookings) {

  // Convert booking data to UTC Date objects
  let bookingStart = dateUTC(data.startDate)
  let bookingEnd = dateUTC(data.endDate)

  // Convert booking Date objects into a number value
  let newBookingStart = bookingStart.getTime()
  let newBookingEnd = bookingEnd.getTime()

  // Check whether the new booking times overlap with any of the existing bookings
  let bookingClash = false

  existingBookings.forEach(booking => {

    let existingBookingStart = booking.bookingStart.getTime()
    let existingBookingEnd = booking.bookingEnd.getTime()

    if (newBookingStart > existingBookingStart && newBookingStart < existingBookingEnd || 
        existingBookingStart > newBookingStart && existingBookingStart < newBookingEnd) {
          return bookingClash = true
    }
  })
  
  // Return an error message if there is a booking clash, otherwise make the booking
  if (bookingClash) {
    throw "Your booking could not be saved. There is an existing booking during the times selected."
  } else {
    return api.put(`/rooms/${data.roomId}`, {
      bookingStart: bookingStart,
      bookingEnd: bookingEnd,
      businessUnit: data.businessUnit,
      purpose: data.purpose
    })
      .then((res) => res.data)
  }
}
