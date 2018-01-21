import React from 'react'
import { formatAssetName, dailyBookings, bookingArray } from '../helpers/rooms'

// Accept the 24 hour dayHours array as the day's booking data for a room
const rowMapper = (dayHours, onShowBooking) => {
  let tableRow = []

  // Loop through each hour from 8AM to 9PM (starting at 8AM = 0)
  for (var i = 0; i < 13; i++) {
    // Extract the corresponding data from the 24 hour array
    let bookingData = dayHours[i + 8]

    // If the data for that hour is a number (not a booking object), there is no booking
    // Add a <td> element that indicates the time slot is available
    if (typeof bookingData == 'number') {
      tableRow.push(<td className="available">&nbsp;</td>)

      // If there is a booking object, add a <td> element with custom class name to enable stlying
    } else {
      tableRow.push(
        <td className={`table__cell`}>
          <span
          onClick={console.log('why!')}
            onClick={() => onShowBooking(bookingData)}
            className={`table__cell--${bookingData.businessUnit // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
              .replace(/ /g, '-')
              .toLowerCase()}
            ${bookingData.firstHalfHour ? 'table__cell--first-half-hour' : ''}
            ${
              bookingData.secondHalfHour ? 'table__cell--second-half-hour' : ''
            }`}
          >
            &nbsp;
          </span>
        </td>
      )
    }
  }
  return tableRow
}

const RoomRow = props => (
  <tr className="table__row">
    <th scope="row" className="table__cell--align-left">
      {props.room.name}
    </th>
    <td className="table__data--asset">
      {Object.keys(props.room.assets).map(
        asset =>
          props.room.assets[asset] && (
            <span key={asset} onClick={props.onShowBooking}>
              {formatAssetName(asset)}
            </span>
          )
      )}
    </td>
    {rowMapper(
      bookingArray(dailyBookings(props.date, props.bookings)),
      props.onShowBooking
    )}
  </tr>
)

export default RoomRow
