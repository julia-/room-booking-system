import React from 'react'
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


// A function to take the bookings for a particular room on a given date and insert them into an array which maps each hour of that day
export function bookingArray(filteredBookings) {
  
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
        if (i === Math.floor(startTime) && startTime % 1 !== 0 ) {
          bookingData.secondHalfHour = true
        }
        // Check if the booking ends on the half hour
        if (i === Math.ceil(finalHour - 1) && finalHour % 1 !== 0 ) {
          bookingData.firstHalfHour = true
        }
      }


      // Add the booking object to the relevant hour in the 24 hour array
      dayHours[i] = bookingData
    }
  })

  // Return the 24 hour array with all booking objects added to each hour they apply to
  return dayHours
}
  
// Accept the 24 hour dayHours array as the day's booking data for a room and return a table row
export function rowMapper(dayHours){
  let tableRow = []

  // Loop through each hour from 8AM to 9PM (starting at 8AM = 0)
  for (var i = 0; i < 13; i++) {

    // Extract the corresponding data from the 24 hour array 
    let bookingData = dayHours[i + 8]

    // If the data for that hour is a number (not a booking object), there is no booking
    // Add a <td> element that indicates the time slot is available
    if (typeof bookingData == 'number') {
      tableRow.push(
        <td className="available">Available</td>
      )

    // If there is a booking object, add a <td> element with custom class name to enable stlying
    } else {
      tableRow.push(
        <td
        // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
          className={`${bookingData.businessUnit
            .replace(/ /g, '-')
            .toLowerCase()}
            ${bookingData.firstHalfHour ? "first-half-hour" : '' }
            ${bookingData.secondHalfHour ? "second-half-hour" : '' }`
          }
        >
          {bookingData.businessUnit}
        </td>
      )
    }
  }
  return tableRow
}

// Accept the 24 hour dayHours array as the day's booking data for a room and a specific hour
// Return a single <td> cell's data for that hour
export function columnMapper(dayHours, hour){
  
  // Extract the corresponding data for a single hour from the 24 hour array 
  let bookingData = dayHours[hour]

  // Data to be returned
  let columnData = ''
  
  // If the data for that hour is a number (not a booking object), there is no booking
  // Return a <td> element that indicates the time slot is available
  if (typeof bookingData == 'number') {
    columnData = <td className="available">Available</td>

  // If there is a booking object, but only for the first half of the hour, return a nested table to split the table data for that cell into two rows. 
  } else if (bookingData.firstHalfHour) {
    columnData =
      <table>
        <tbody>
          <tr>
            <td
              className={`${bookingData.businessUnit
                .replace(/ /g, '-')
                .toLowerCase()}`
              }
            >
              {bookingData.businessUnit}
            </td>
          </tr>
          <tr>
            <td className="available">Available</td>
          </tr>
        </tbody>
      </table>

  // If there is a booking object, but only for the second half of the hour, return a nested table to split the table data for that cell into two rows. 
  } else if (bookingData.firstHalfHour) {
    columnData =
      <table>
        <tbody>
          <tr>
            <td className="available">Available</td>
          </tr>
          <tr>
            <td
              className={`${bookingData.businessUnit
                .replace(/ /g, '-')
                .toLowerCase()}`
              }
            >
              {bookingData.businessUnit}
            </td>
          </tr>
        </tbody>
      </table>

  // If there is a booking object for the full hour, return a single <td> cell  
  } else {
    columnData =
      <td
        className={`${bookingData.businessUnit
          .replace(/ /g, '-')
          .toLowerCase()}`
        }>
          {bookingData.businessUnit}
      </td>
  }
  return columnData
}
