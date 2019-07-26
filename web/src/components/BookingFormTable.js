import React from 'react'
import moment from 'moment'
import ColumnCell from './ColumnCell'

const BookingFormTable = ({
  date,
  roomData,
  onShowBooking,
}) => (
  <table className="table--booking">
    <thead>
      <tr className="table__row table__row--header">
        <th colSpan="2" className="table__cell--header table__cell--level header__heading header__heading--column">{moment(date).format('MMMM Do YYYY')}</th>
      </tr>
      <tr className="table__row table__row--subheader">
        <th scope="col" className="table__cell--header">Time</th>
        <th scope="col" className="table__cell--header">Bookings</th>
      </tr>
    </thead>
    <tbody className="table__body--booking">
      <tr className="table__row--full">
        <th scope="row">8am</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={8}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">9am</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={9}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">10am</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={10}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">11am</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={11}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">12pm</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={12}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">1pm</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={13}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">2pm</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={14}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">3pm</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={15}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">4pm</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={16}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">5pm</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={17}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">6pm</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={18}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">7pm</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={19}
            onShowBooking={onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">8pm</th>
          <ColumnCell
            date={date}
            bookings={roomData.bookings}
            hour={20}
            onShowBooking={onShowBooking}
          />
      </tr>
    </tbody>
  </table>
)

export default BookingFormTable
