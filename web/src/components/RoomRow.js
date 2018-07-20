import React, { Fragment, Component } from 'react'
import {Link} from 'react-router-dom'
import { formatAssetName, dailyBookings, bookingArray } from '../helpers/rooms'

// Accept the 24 hour dayHours array as the day's booking data for a room
const rowMapper = (
  dayHours, 
  onSetRoom,
  room,
  onShowBooking,
) => {
  let tableRow = []

  // Loop through each hour from 8AM to 9PM (starting at 8AM = 0)
  for (var i = 0; i < 13; i++) {
    // Extract the corresponding data from the 24 hour array
    let bookingData = dayHours[i + 8]

    // If the data for that hour is a number (not a booking object), there is no booking
    // Add a <td> element that indicates the time slot is available
    if (typeof bookingData == 'number') {
      tableRow.push(<td key={`rowMapper${i}`} className="table__cell--available">
          <Link to="/createbooking" onClick={() => {
              onSetRoom(room._id)
        }} className="table__link--available">
            &nbsp;
          </Link>
        </td>)

     // If the data is an array, there are two booking objects
    } else if (Array.isArray(bookingData)){

    // Determine which of the two bookings comes first and second
    let firstBookingData = bookingData[0].firstHalfHour ?
      bookingData[0] : bookingData[1]

    let secondBookingData = bookingData[0].secondHalfHour ?
        bookingData[0] : bookingData[1]

      tableRow.push(
        <table className="table--booking--split">
          <tbody>
            <tr>
              <td className={`table__cell`}>
                <span
                  onClick={() => onShowBooking(firstBookingData)}
                  className={`table__cell--booked table__cell--${firstBookingData.businessUnit // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
                    .replace(/ /g, '-')
                    .toLowerCase()} first
                  `}
                >
                  &nbsp;
                </span>
              </td>
              <td className={`table__cell`}>
                <span
                  onClick={() => onShowBooking(secondBookingData)}
                  className={`table__cell--booked table__cell--${secondBookingData.businessUnit // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
                    .replace(/ /g, '-')
                    .toLowerCase()} second
                  `}
                >
                  &nbsp;
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      )
    
    // If there is a booking object, add a <td> element with custom class name to enable stlying
    } else {
      tableRow.push(
        <td key={`tableRowTD${i}`} className={`table__cell`}>
          <span
            onClick={() => onShowBooking(bookingData)}
           // Class name will show the business unit that made the booking, 
           // and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
             className={`table__cell--booked table__cell--${bookingData.businessUnit.replace(/ /g, '-').toLowerCase()} ${!bookingData.bookingStart.includes(':30:') && bookingData.duration === 0.5 ? 'table__cell--first-half-hour' : ''} ${bookingData.bookingStart.includes(':30:')  && bookingData.duration === 0.5 ? 'table__cell--second-half-hour' : ''}`}
          >
            &nbsp;
          </span>
        </td>
      )
    }
  }
  return tableRow;
};

const RoomRow = ({
  onSetRoom,
  room,
  onShowBooking,
  date,
  bookings,
}) =>
  <tr className="table__row">
    <th scope="row" className="table__cell--align-left">
      <Link to="/createbooking" onClick={() => onSetRoom(room._id)} className="table__link">{room.name}</Link>
      <ul>
        {Object.keys(room.assets).map(
          asset =>
            room.assets[asset] && (
              <li key={asset} className="table__data--asset">{formatAssetName(asset)}</li>
            )
        )}
      </ul>
    </th>
    {rowMapper(
      bookingArray(dailyBookings(date, bookings)),
      onSetRoom,
      room,
      onShowBooking,
    )}
  </tr>;

export default RoomRow;


/*  {room.assets.length && room.assets.map(asset =>
          <li key={asset.name} onClick={onShowBooking} className="table__data--asset">{asset.name}</li>
        )}*/
