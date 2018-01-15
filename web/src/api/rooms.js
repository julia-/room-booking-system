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

// accepts the current date in 'YYYY/MM/DD' format and an array of bookings and returns an array with required details - the start time and length of each booking in hours and details regarding who made the booking
export function dailyBookings(currentDate, roomBookings) {
  // 
}
