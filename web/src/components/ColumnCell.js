import React, { Fragment } from 'react'
import { dailyBookings, bookingArray } from '../helpers/rooms'

const ColumnCell = props => {

  // Get the day's bookings for a room
  let bookings = dailyBookings(props.date, props.bookings)

  // Add the day's bookings to a 24 hour array
  let dayHours = bookingArray(bookings)

  // Extract the corresponding data for a single hour from the 24 hour array
  let bookingData = dayHours[props.hour]

  // Data to be returned
  let columnData = ''

  // If the data for that hour is a number (not a booking object), there is no booking
  // Return a <td> element that indicates the time slot is available
  if (typeof bookingData == 'number') {
    columnData = <div className="table__cell--form table__cell--available">Available</div>

  // If the data for that hour is an array, this means there are two bookings to be rendered
  } else if (Array.isArray(bookingData)) {

    // Determine which of the two bookings comes first and second
    let firstBookingData = bookingData[0].firstHalfHour ?
                            bookingData[0] : bookingData[1]

    let secondBookingData = bookingData[0].secondHalfHour ?
                            bookingData[0] : bookingData[1]

    columnData =
      <Fragment>
        <div className="table__row--no-border table__row--border-bottom">
          <div className="table__row--split-booking table__row--no-border">
            <div
            onClick={() => props.onShowBooking(firstBookingData)}
            className={`table__cell--${firstBookingData.businessUnit
              .replace(/ /g, '-')
            .toLowerCase()} table__cell--split`
            }
          >
            {firstBookingData.businessUnit}
          </div>
        </div>
        <div className="table__row--split-booking table__row--no-border">
          <div
            onClick={() => props.onShowBooking(secondBookingData)}
            className={`table__cell--${secondBookingData.businessUnit
              .replace(/ /g, '-')
            .toLowerCase()} table__cell--split`
            }
          >
            {secondBookingData.businessUnit}
          </div>
        </div>
        </div>
      </Fragment>

  // If there is a booking object, but only for the first half of the hour, return a nested table to split the table data for that cell into two rows.
  } else if (bookingData.firstHalfHour) {
    columnData =
      <Fragment>
        <div className="table__row--no-border table__row--border-bottom">
          <div className="table__row--split-booking table__row--no-border">
            <div
              onClick={() => props.onShowBooking(bookingData)}
              className={`table__cell--${bookingData.businessUnit
                .replace(/ /g, '-')
                .toLowerCase()} table__cell--split`
              }
            >
              {bookingData.businessUnit}
            </div>
          </div>
          <div className="table__row--split-booking table__row--no-border">
            <div className="table__cell--split table__cell--available">
              Available
            </div>
          </div>
        </div>
      </Fragment>

  // If there is a booking object, but only for the second half of the hour, return a nested table to split the table data for that cell into two rows
  } else if (bookingData.secondHalfHour) {
    columnData =
      <Fragment>
        <div className="table__row--no-border table__row--border-bottom">
          <div className="table__row--split-booking table__row--no-border table__row--border-bottom">
            <div className="table__cell--split table__cell--available">
              Available
            </div>
          </div>
          <div className="table__row--split-booking table__row--no-border table__row--border-bottom">
            <div
              onClick={() => props.onShowBooking(bookingData)}
              className={`table__cell--${bookingData.businessUnit
                .replace(/ /g, '-')
                .toLowerCase()} table__cell--split`
              }
            >
              {bookingData.businessUnit}
            </div>
          </div>
        </div>
      </Fragment>

  // If there is a booking object for the full hour, return a single cell
  } else {
    columnData =
      <div
        onClick={() => props.onShowBooking(bookingData)}
        className={`table__cell--form table__cell--${bookingData.businessUnit
          .replace(/ /g, '-')
          .toLowerCase()}`
        }>
          {bookingData.businessUnit}
      </div>
  }
  return columnData
}

export default ColumnCell
