import React from 'react'
import moment from 'moment'

const formatAssetName = asset => {
  if (asset === 'opWalls') {
    return 'Operable Walls'
  } else if (asset === 'pcLab') {
    return 'PC Lab'
  } else if (asset === 'macLab') {
    return 'Mac Lab'
  } else if (asset === 'tv') {
    return 'TV'
  } else if (asset === 'whiteBoard') {
    return 'Whiteboard'
  } else if (asset === 'projector') {
    return 'Projector'
  }
}

// Accepts the search date in 'YYYY/MM/DD' format and all of a room's bookings and filters the array for bookings that match the search date
const dailyBookings = (currentDate, roomBookings) => {
  const filteredBookings = roomBookings.filter(
    (
      booking // Check if the booking is for the current date
    ) =>
      moment(booking.bookingStart).format('YYYY-MM-DD') ===
      moment(currentDate).format('YYYY-MM-DD')
  )
  return filteredBookings
}

// A function to take the bookings for a particular room on a given date and insert them into an array which maps each hour of that day
const bookingArray = (filteredBookings) => {
  // An array from 1 to 24 representing each hour of the day
  let dayHours = [...Array(24).keys()]

  filteredBookings.forEach(booking => {
    let startTime = booking.startHour
    let duration = booking.duration
    let finalHour = startTime + duration

    // Push each booking into the relevant hour in the 24 hour array
    // Loop from the beginning of the start hour to the end of the final hour (rounding half hours)
    for (let i = Math.floor(startTime); i < Math.ceil(finalHour); i++) {
      // Create a copy of the booking to customise for each hour
      let bookingData = Object.assign({}, booking)

      // Check if the total booking is half-hour long and begins on the half hour
      if (duration === 0.5 && startTime % 1 !== 0) {
        bookingData.secondHalfHour = true
        // Check if the total booking is half-hour long and begins on the hour
      } else if (duration === 0.5 && startTime % 1 === 0) {
        bookingData.firstHalfHour = true
        // If the booking is longer than half an hour
      } else {
        // Check if the booking starts on the half hour
        if (i === Math.floor(startTime) && startTime % 1 !== 0) {
          bookingData.secondHalfHour = true
        }
        // Check if the booking ends on the half hour
        if (i === Math.ceil(finalHour - 1) && finalHour % 1 !== 0) {
          bookingData.firstHalfHour = true
        }
      }

      // Add the booking object to the relevant hour in the 24 hour array
      // If there is already a booking in that hour, enter the second booking as the second item in an array
      dayHours[i] = typeof dayHours[i] == 'number' ? 
                      bookingData :
                      [dayHours[i], bookingData]
    }
  })

  // Return the 24 hour array with all booking objects added to each hour they apply to
  return dayHours
}

export { formatAssetName, dailyBookings, bookingArray }
