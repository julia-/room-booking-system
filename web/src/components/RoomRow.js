import React from 'react'
import formatAssetName from '../helpers/rooms'
import { dailyBookings } from '../api/rooms'

const bookingArray = filteredBookings => {
  let array = [...Array(24).keys()]
  filteredBookings.forEach(booking => {
    let startTime = booking.startHour
    let duration = booking.duration
    let bookingDuration = Math.floor(startTime + duration)
    for (var i = startTime; i < bookingDuration; i++) {
      array[i] = booking
    }
  })
  return array
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
