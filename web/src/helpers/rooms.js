import React from 'react'
import moment from 'moment'

const initialRoom = {
  _id: '5a5c0d782b191c21b1eebf4e',
  name: 'Room 1',
  floor: '8',
  capacity: 18,
  bookings: [],
  assets: {
    whiteBoard: false,
    opWalls: false,
    tv: false,
    projector: false,
    pcLab: true,
    macLab: false
  },
  __v: 0
}

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
      dayHours[i] = bookingData
    }
  })

  // Return the 24 hour array with all booking objects added to each hour they apply to
  return dayHours
}

// Accept the 24 hour dayHours array as the day's booking data for a room and a specific hour
// Return a single <td> cell's data for that hour
const columnMapper = (dayHours, hour) => {
  
  // Extract the corresponding data for a single hour from the 24 hour array 
  let bookingData = dayHours[hour]

  // Data to be returned
  let columnData = ''
  
  // If the data for that hour is a number (not a booking object), there is no booking
  // Return a <td> element that indicates the time slot is available
  if (typeof bookingData == 'number') {
    columnData = <td className="bookings-column available">Available</td>

  // If there is a booking object, but only for the first half of the hour, return a nested table to split the table data for that cell into two rows. 
  } else if (bookingData.firstHalfHour) {
    columnData =
      <td>
        <table>
          <tbody>
            <tr className="sub-cell-divider">
              <td
                className={`bookings-column ${bookingData.businessUnit
                  .replace(/ /g, '-')
                  .toLowerCase()} sub-cell`
                }
              >
                {bookingData.businessUnit}
              </td>
            </tr>
            <tr>
              <td className="bookings-column sub-cell available">Available</td>
            </tr>
          </tbody>
        </table>
      </td>

  // If there is a booking object, but only for the second half of the hour, return a nested table to split the table data for that cell into two rows. 
  } else if (bookingData.secondHalfHour) {
    columnData =
      <td>  
        <table>
          <tbody>
            <tr className="sub-cell-divider">
              <td className="bookings-column sub-cell available">Available</td>
            </tr>
            <tr>
              <td
                className={`bookings-column ${bookingData.businessUnit
                  .replace(/ /g, '-')
                  .toLowerCase()} sub-cell`
                }
              >
                {bookingData.businessUnit}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
  // If there is a booking object for the full hour, return a single <td> cell  
  } else {
    columnData =
      <td
        className={`bookings-column ${bookingData.businessUnit
          .replace(/ /g, '-')
          .toLowerCase()}`
        }>
          {bookingData.businessUnit}
      </td>
  }
  return columnData
}

export { initialRoom, formatAssetName, dailyBookings, bookingArray, columnMapper }
