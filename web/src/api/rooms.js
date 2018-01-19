import moment from 'moment'
import momentTimezone from 'moment-timezone'
import api from './init'

export function listRooms() {
  return api.get('/rooms').then(res => res.data)
}

// Accepts the search date in 'YYYY/MM/DD' format and all of a room's bookings and filters the array for bookings that match the search date
export function dailyBookings(currentDate, roomBookings) {
  const filteredBookings = roomBookings.filter(
    (
      booking // Check if the booking is for the current date
    ) =>
      moment(booking.bookingStart).format('YYYY-MM-DD') ===
      moment(currentDate).format('YYYY-MM-DD')
  )
  return filteredBookings
}
