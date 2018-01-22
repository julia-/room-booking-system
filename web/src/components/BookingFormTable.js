import React from 'react'
import ColumnCell from './ColumnCell'

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
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={8}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">9am</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={9}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">10am</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={10}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">11am</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={11}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">12pm</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={12}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">1pm</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={13}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">2pm</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={14}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">3pm</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={15}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">4pm</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={16}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">5pm</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={17}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">6pm</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={18}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">7pm</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={19}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="room-table body-row">
        <th scope="row" className="left-column">8pm</th>
          <ColumnCell 
            date={props.date}
            bookings={props.roomData.bookings}
            hour={20}
            onShowBooking={props.onShowBooking}
          />
      </tr>
    </tbody>
  </table>
)

export default BookingFormTable
