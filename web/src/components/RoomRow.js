import React from 'react'
import formatAssetName from '../helpers/rooms'
import { dailyBookings } from '../api/rooms'

// A function to take the bookings for a particular room on a given date and insert them into an array which maps each hour of that day
const bookingArray = filteredBookings => {

  // An array from 1 to 24 representing each hour of the day
  let dayHours = [...Array(24).keys()]

  filteredBookings.forEach(booking => {
    let startTime = booking.startHour
    let duration = booking.duration
    let finalHour = startTime + duration

    // Push each booking into the relevant hour in the 24 hour array 
    for (var i = startTime; i < finalHour; i++) {
      dayHours[i] = booking
    }
  })
  
  return dayHours
}

const rowMapper = array => {
  let row = []
  for (var i = 0; i < 13; i++) {
    let bookingData = array[i + 8]
    if (typeof bookingData == 'number') {
      row.push(<td className="available">Available</td>)
    } else {
      row.push(
        <td
          className={`${bookingData.businessUnit
            .replace(/ /g, '-')
            .toLowerCase()}`}
        >
          {bookingData.businessUnit}
        </td>
      )
    }
  }
  return row
}

const RoomRow = props => (
  <tr>
    <td>{props.room.name}</td>
    <td>
      {Object.keys(props.room.assets).map(
        asset =>
          props.room.assets[asset] && (
            <span key={asset}>{formatAssetName(asset)}</span>
          )
      )}
    </td>
    {rowMapper(bookingArray(dailyBookings(props.date, props.bookings)))}
  </tr>
)

export default RoomRow
