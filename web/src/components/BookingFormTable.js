import React from 'react'
import { dailyBookings, bookingArray, columnMapper } from '../api/rooms'

const BookingFormTable = props => (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Bookings</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>8am</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 8
              )
            }
        </tr>
        <tr>
          <td>9am</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 9
              )
            }
        </tr>
        <tr>
          <td>10am</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 10
              )
            }
        </tr>
        <tr>
          <td>11am</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 11
              )
            }
        </tr>
        <tr>
          <td>12pm</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 12
              )
            }
        </tr>
        <tr>
          <td>1pm</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 13
              )
            }
        </tr>
        <tr>
          <td>2pm</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 14
              )
            }
        </tr>
        <tr>
          <td>3pm</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 15
              )
            }
        </tr>
        <tr>
          <td>4pm</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 16
              )
            }
        </tr>
        <tr>
          <td>5pm</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 17
              )
            }
        </tr>
        <tr>
          <td>6pm</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 18
              )
            }
        </tr>
        <tr>
          <td>7pm</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 19
              )
            }
        </tr>
        <tr>
          <td>8pm</td>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 20
              )
            }
        </tr>
      </tbody>
    </table>
)

export default BookingFormTable