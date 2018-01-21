import React from 'react'
import { dailyBookings, bookingArray, columnMapper } from '../helpers/rooms'

const BookingFormTable = props => (
    <table className="room-table">
      <thead>
        <tr scope="col" className="room-table header-row">
          <th className="left-column">Time</th>
          <th className="bookings-column">Bookings</th>
        </tr>
      </thead>
      <tbody>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">8am</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 8, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">9am</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 9, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">10am</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 10, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">11am</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 11, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">12pm</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 12, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">1pm</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 13, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">2pm</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 14, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">3pm</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 15, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">4pm</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 16, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">5pm</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 17, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">6pm</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 18, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">7pm</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 19, props.onShowBooking
              )
            }
        </tr>
        <tr className="room-table body-row">
          <th scope="row" className="left-column">8pm</th>
            { 
              columnMapper(
                bookingArray(
                  dailyBookings(props.date, props.roomData.bookings)
                ), 20, props.onShowBooking
              )
            }
        </tr>
      </tbody>
    </table>
)

export default BookingFormTable