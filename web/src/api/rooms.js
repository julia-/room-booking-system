import React from 'react'
import moment from 'moment'
import api from './init'

export function listRooms() {
  return api.get('/rooms').then(res => res.data)
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
      <td>
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
      </td>

  // If there is a booking object, but only for the second half of the hour, return a nested table to split the table data for that cell into two rows. 
  } else if (bookingData.secondHalfHour) {
    columnData =
      <td>  
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
      </td>
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

