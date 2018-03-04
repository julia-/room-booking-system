import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { formatAssetName, dailyBookings, bookingArray } from '../helpers/rooms'

// Accept the 24 hour dayHours array as the day's booking data for a room
const rowMapper = (dayHours, props) => {
  let tableRow = []

  // Loop through each hour from 8AM to 9PM (starting at 8AM = 0)
  for (var i = 0; i < 13; i++) {
    // Extract the corresponding data from the 24 hour array
    let bookingData = dayHours[i + 8]

    // If the data for that hour is a number (not a booking object), there is no booking
    // Adds a div element to indicate the time slot is available
    if (typeof bookingData == 'number') {
      tableRow.push(
        <div className="table__cell table__cell--available">
          <Link
            to="/createbooking"
            onClick={() => {props.onSetRoom(props.room._id)}}
            className="table__link--available"
          >
            &nbsp;
          </Link>
        </div>
      )

     // If the data is an array, there are two booking objects
    } else if (Array.isArray(bookingData)) {
      // Determine which of the two bookings comes first and second
      let firstBookingData = bookingData[0].firstHalfHour ? bookingData[0] : bookingData[1]
      let secondBookingData = bookingData[0].secondHalfHour ? bookingData[0] : bookingData[1]

      tableRow.push(
        <div className="table__cell">
          <span
            onClick={() => props.onShowBooking(firstBookingData)}
            // Class name shows the business unit, and whether the cell should be fully shaded, or half (indicating a half-hour booking)
            className={`table__cell--booked table__cell--left table__cell--${firstBookingData.businessUnit
                .replace(/ /g, '-')
                .toLowerCase()}
                `}
          >
            &nbsp;
          </span>
          <span
            onClick={() => props.onShowBooking(secondBookingData)}
            // Class name shows the business unit, and whether the cell should be fully shaded, or half (indicating a half-hour booking)
            className={`table__cell--booked table__cell--right table__cell--${secondBookingData.businessUnit
              .replace(/ /g, '-')
              .toLowerCase()}
            `}
          >
            &nbsp;
          </span>
        </div>
      )
    // If there is a booking object, add a <td> element with custom class name to enable stlying
    } else if (bookingData.firstHalfHour) {
      tableRow.push(
        <div className="table__cell">
          <span
            onClick={() => props.onShowBooking(bookingData)}
            // Class name shows the business unit, and whether the cell should be fully shaded, or half (indicating a half-hour booking)
            className={`table__cell--booked table__cell--left table__cell--${bookingData.businessUnit
              .replace(/ /g, '-')
              .toLowerCase()}`}
          >
            &nbsp;
          </span>
          <span className="table__cell--available table__cell--right">
            <Link
              to="/createbooking"
              onClick={() => {props.onSetRoom(props.room._id)}} className="table__link--available"
            >
              &nbsp;
            </Link>
          </span>
        </div>
      )
    } else if (bookingData.secondHalfHour) {
      tableRow.push(
        <div className="table__cell">
          <span className="table__cell--available table__cell--left">
            <Link
              to="/createbooking"
              onClick={() => {props.onSetRoom(props.room._id)}} className="table__link--available"
            >
              &nbsp;
            </Link>
          </span>
          <span
            onClick={() => props.onShowBooking(bookingData)}
            // Class name shows the business unit, and whether the cell should be fully shaded, or half (indicating a half-hour booking)
            className={`table__cell--booked table__cell--right
              table__cell--${bookingData.businessUnit
                .replace(/ /g, '-')
                .toLowerCase()}
              `}
          >
            &nbsp;
          </span>
        </div>
      )
    } else {
      tableRow.push(
        <div className="table__cell">
          <span
            onClick={() => props.onShowBooking(bookingData)}
            // Class name shows the business unit, and whether the cell should be completly or half shaded (indicating a half-hour booking)
            className={`table__cell--booked table__cell--${bookingData.businessUnit
              .replace(/ /g, '-')
              .toLowerCase()}
              ${bookingData.firstHalfHour ? 'table__cell--left' : ''}
              ${bookingData.secondHalfHour ? 'table__cell--right' : ''}
            `}
          >
            &nbsp;
          </span>
        </div>
      )
    }
  }
  return tableRow
}

const RoomRow = props => (
  <div className="table__row">
    <div className="table__cell table__cell--column">
      <Link
        to="/createbooking"
        onClick={() => props.onSetRoom(props.room._id)}
        className="table__link"
      >
        {props.room.name}
      </Link>
      <ul>
      {Object.keys(props.room.assets).map(
        asset =>
          props.room.assets[asset] && (
            <li key={asset} onClick={props.onShowBooking} className="table__data--asset">{formatAssetName(asset)}</li>
            )
          )}
      </ul>
    </div>
    {rowMapper(
      bookingArray(dailyBookings(props.date, props.bookings)),
      props
    )}
  </div>
)

export default RoomRow
