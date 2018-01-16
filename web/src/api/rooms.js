import moment from 'moment'
import momentTimezone from 'moment-timezone'
import api from './init'

export function listRooms() {
  return api.get('/rooms')
    .then((res) => res.data)
}

// Function to convert retrieved booking data (as a UTC JS Date object) to a Moment.js object in AEST
const dateAEST = (date) => {
  return momentTimezone(date).tz('Australia/Sydney')
}

// Accepts the search date in 'YYYY/MM/DD' format and all of a room's bookings and filters the array for bookings that match the search date
export function dailyBookings(currentDate, roomBookings) {
  return roomBookings.filter(booking =>
    // Check if the booking is for the current date 
    dateAEST(booking.bookingStart).format('YYYY/MM/DD') === currentDate
  )
}


