import React from 'react'
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
    columnData = <td className="bookings-column available">Available</td>

  // If there is a booking object, but only for the first half of the hour, return a nested table to split the table data for that cell into two rows. 
  } else if (bookingData.firstHalfHour) {
    columnData =
      <td>
        <table>
          <tbody>
            <tr className="sub-cell-divider">
              <td
                onClick={() => props.onShowBooking(bookingData)}
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
                onClick={() => props.onShowBooking(bookingData)}
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
        onClick={() => props.onShowBooking(bookingData)}
        className={`bookings-column ${bookingData.businessUnit
          .replace(/ /g, '-')
          .toLowerCase()}`
        }>
          {bookingData.businessUnit}
      </td>
  }
  return columnData
}

export default ColumnCell
